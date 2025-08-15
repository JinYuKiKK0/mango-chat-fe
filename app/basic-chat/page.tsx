'use client';

import React, {useEffect, useState} from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Chip
} from "@mui/material";
import {getCurrentUserId, getLoginData} from "../_lib/userUtils";
import {getConversationDetails, getConversationList, getUserSelfInfo, startStreamChat} from "../api/api";
import {useSearchParams} from "next/navigation";

interface NodeStatus {
    title: string;
    node_type: string;
    index: number;
}


export default function BasicChatPage() {
    const searchParams = useSearchParams();
    const sessionId = Number(searchParams.get("sessionId"));

    /**
     * 历史对话列表
     */
    const [conversationList, setConversationList] = useState<ConversationListItem[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await getConversationList(getCurrentUserId()!,undefined,100)
            setConversationList(result.data?.list ?? [])
        }
        fetchData();
    },[])

    /**
     * 对话详情
     */
    const [ conversationDetailData,  setConversationDetailData] = useState<ConversationDetailData>();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    useEffect(() => {
        if (!sessionId) return;
        const fetchData = async () => {
            const result = await getConversationDetails(getCurrentUserId()!,sessionId)
            setConversationDetailData(result.data)
            setMessages(result.data.context.messages ?? [])
        }
        fetchData()
    }, [sessionId]);

    /**
     * 发送消息
     */
    const [input, setInput] = useState("");
    const [isGettingResponse, setIsGettingResponse] = useState(false);
    const [currentNodeStatus, setCurrentNodeStatus] = useState<NodeStatus | null>(null);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: ChatMessage = { role: "user", content: input };
        setMessages(prevMessages => [...prevMessages, userMessage]);

        const messageToSend = input;
        setInput("");
        setIsGettingResponse(true);
        setCurrentNodeStatus(null);

        const assistantMessage: ChatMessage = { role: "assistant", content: "" };
        setMessages(prevMessages => [...prevMessages, assistantMessage]);

        // const userData = await getUserSelfInfo(getCurrentUserId() ?? -1);

        try {
            const response = await startStreamChat({
                message: messageToSend,
                conversation_id: conversationDetailData?.conversationId ?? undefined,
                // user: userData.data.email,
            });

            if (!response.body) {
                throw new Error("The response body is empty.");
            }

            const reader = response.body.getReader()
            const decoder = new TextDecoder();
            let buffer = '';
            // 持续读取流数据
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                // 使用双换行符分割消息块
                const messageBlocks = buffer.split('\n\n');
                // 保留最后一个不完整的块，等待后续数据
                buffer = messageBlocks.pop() || '';

                for (const block of messageBlocks) {
                    if (!block) continue;

                    let eventType = '';
                    let eventData = '';

                    // 逐行解析单个消息块
                    const lines = block.split('\n');
                    for (const line of lines) {
                        if (line.startsWith('event:')) {
                            eventType = line.substring('event:'.length).trim();
                        } else if (line.startsWith('data:')) {
                            eventData = line.substring('data:'.length).trim();
                        }
                    }

                    if (eventType && eventData) {
                        try {
                            const parsedData = JSON.parse(eventData);

                            if (eventType === 'node_started') {
                                setCurrentNodeStatus({
                                    title: parsedData.title,
                                    node_type: parsedData.node_type,
                                    index: parsedData.index
                                });
                            } else if (eventType === 'message') {
                                setMessages(prev => {
                                    const lastMsg = prev[prev.length - 1];
                                    if (lastMsg && lastMsg.role === 'assistant') {
                                        // 移除可能存在的 <output> 标签
                                        const cleanAnswer = parsedData.answer.replace(/^<output>\n?/, '');
                                        lastMsg.content += cleanAnswer;
                                        return [...prev.slice(0, -1), { ...lastMsg }];
                                    }
                                    return prev;
                                });
                            } else if (eventType === 'workflow_finished') {
                                console.log('Workflow finished:', parsedData);
                                // 可以在这里做一些最终的清理工作
                            }
                        } catch (e) {
                            console.error("Failed to parse event data JSON:", eventData, e);
                        }
                    }
                }
            }

        } catch (error) {
            console.error("Error handling stream chat:", error);
            const errorMessage: ChatMessage = { role: "assistant", content: "抱歉，处理您的请求时发生了一个错误。" };
            setMessages(prev => [...prev.slice(0, -1), errorMessage]);
        } finally {
            if (messages[messages.length-1].content === "") {
                console.error("Error handling stream chat: 返回为空");
                const errorMessage: ChatMessage = { role: "assistant", content: "抱歉，处理您的请求时发生了一个错误。" };
                setMessages(prev => [...prev.slice(0, -1)], errorMessage);
            }
            setIsGettingResponse(false);
            setCurrentNodeStatus(null);
        }
    };


    function handleConversationClick(id: number) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sessionId", id.toString());
        window.history.pushState(null, '', `?${params.toString()}`);
    }

    return (
        <Box display="flex" minHeight="90vh">
            <div className="w-1/5 bg-gray-50 dark:bg-slate-800 dark:text-slate-100 p-4 overflow-auto border-r">
                <Box>
                    <Typography variant="h6" gutterBottom>
                        历史会话
                    </Typography>
                    <Divider />
                    <List>
                        {conversationList.map((item, index) => (
                            <ListItem disablePadding key={index} onClick={() => handleConversationClick(item.id)}>
                                <ListItemButton>
                                    <ListItemText primary={item.title} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </div>

            <div className="w-4/5 bg-white dark:bg-slate-800 dark:text-slate-100 p-4 flex flex-col">
                <Box display="flex" flexDirection="column" width="100%" height="100%" p={3}>
                    <Box flexGrow={1} overflow="auto" sx={{paddingRight: '1rem'}}>
                        {messages.map((msg, index) => (
                            <Card key={index} sx={{ mb: 2, maxWidth: '80%', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', bgcolor: msg.role === 'user' ? 'primary.light' : 'background.paper' }}>
                                <CardContent>
                                    <Typography sx={{ color: msg.role === "user" ? "common.white" : "text.primary" }}>
                                        <strong>{msg.role === "user" ? "你" : "助手"}:</strong>
                                    </Typography>
                                    <Typography sx={{ whiteSpace: 'pre-wrap', color: msg.role === 'user' ? 'common.white' : 'text.primary' }}>
                                        {msg.content.split("<output>\n")}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>

                    {/* 节点状态显示区域 */}
                    {isGettingResponse && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
                            <Chip label={`节点 ${currentNodeStatus?.index ?? 0}: 正在执行 [${currentNodeStatus?.title ?? "消息发送"}] ...`} color="info" />
                        </Box>
                    )}

                    <Box display="flex" gap={2} sx={{ mt: 2 }}>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="输入你的消息..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            disabled={isGettingResponse}
                        />
                        <Button variant="contained" onClick={handleSend} disabled={isGettingResponse}>发送</Button>
                    </Box>
                </Box>
            </div>
        </Box>
    );
}