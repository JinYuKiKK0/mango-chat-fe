'use client';

import React, {useEffect, useState} from "react";
import { Box, Button, Card, CardContent, TextField, Typography, Divider, List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import {getCurrentUserId} from "../_lib/userUtils";


interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function BasicChatPage() {
    const userId = getCurrentUserId();

    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");



    // const conversationListQuery = useConversationListQuery(userId ?? -1 ,undefined,1000);
    // console.log("conversationListQuery:", conversationListQuery.data)
    const conversationTitleList =  [];
        // conversationListQuery.data?.data?.list?.map(conv => conv.title)??


    const handleSend = () => {
        if (!input.trim()) return;
        const newMessages = [...messages, { role: "user" as const, content: input }];
        setMessages([...newMessages, { role: "assistant" as const, content: "模拟回复内容" }]);
        setInput("");
    };

    return (
        <Box display="flex" minHeight="90vh">
            <div className="w-1/5 bg-gray-50 dark:bg-slate-800 dark:text-slate-100 p-4 overflow-auto border-r">
                <Box>
                    <Typography variant="h6" gutterBottom>
                        历史会话
                    </Typography>
                    <Divider />
                    <List>
                        {conversationTitleList.map((item, index) => (
                            <ListItem disablePadding key={index}>
                                <ListItemButton>
                                    <ListItemText primary={item} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </div>

            <div className="w-4/5 bg-white dark:bg-slate-800 dark:text-slate-100 p-4 flex flex-col">
                <Box display="flex" flexDirection="column" width="100%" height="100%" p={3}>

                    <Box flexGrow={1} overflow="auto">
                        {messages.map((msg, index) => (
                            <Card key={index} sx={{ mb: 2, maxWidth: 600 }}>
                                <CardContent>
                                    <Typography color={msg.role === "user" ? "primary" : "success.main"}>
                                        <strong>{msg.role === "user" ? "你" : "助手"}:</strong> {msg.content}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>

                    <Box display="flex" gap={2} sx={{ mt: 2 }}> {/* 添加一些上边距 */}
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="输入你的消息..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        />
                        <Button variant="contained" onClick={handleSend}>发送</Button>
                    </Box>
                </Box>
            </div>
        </Box>
    );
}