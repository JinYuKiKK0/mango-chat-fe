import { useFormikContext } from "formik";
import {useEffect, useState} from "react";
import {ApiResponseObject, defaultApi} from "../../api";
import Button from "../../_components/Button";

/**
 * 发送验证码按钮
 * @param displayNotification 顶部的通知栏
 * @param onSend 发送验证码的函数
 * @constructor
 */
export const SendCodeButton = ({ displayNotification, onSend}:
                               { displayNotification: (type: "success" | "warning", message: string) => void; onSend: () => Promise<ApiResponseObject>}) => {
    const { values, setFieldError, errors } = useFormikContext<RegisterRequest>();
    const [countdown, setCountdown] = useState(0);
    const [isSending, setIsSending] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else {
            setIsSending(false);
        }
        return () => clearTimeout(timer);
    }, [countdown]);

    const handleSendCode = async () => {
        // Manually trigger validation for the email field
        if (!values.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            setFieldError('email', '请输入有效的邮箱地址后再获取验证码');
            return;
        }

        setIsSending(true);
        try {
            const result = await onSend();
            if (result.code === 200) {
                displayNotification('success', '验证码已发送，请注意查收！');
                setCountdown(60);
            } else {
                displayNotification('warning', result.message || '发送失败，请重试');
                setIsSending(false);
            }
        } catch (error) {
            displayNotification('warning', '发送请求失败，请检查网络');
            setIsSending(false);
        }
    };

    return (
        <Button
            label={countdown > 0 ? `${countdown}秒后重试` : "获取验证码"}
            color="info"
            type="button"
            className="!h-12"
            onClick={handleSendCode}
            disabled={isSending}
        />
    );
};