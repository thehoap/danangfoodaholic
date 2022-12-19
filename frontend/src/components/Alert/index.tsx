import { notification } from 'antd';
import { useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { deleteMessage } from 'redux/slices/messageSlice';
import { StyledAlert } from './styles';

const Alert = () => {
    const appDispatch = useAppDispatch();
    const { content, title, type }: IMessage = useAppSelector(
        (state) => state.message
    );

    const alertRef = useRef<HTMLDivElement | null>(null);
    // const [api, contextHolder] = notification.useNotification({
    //     getContainer: () => alertRef.current as HTMLDivElement,
    // });
    const [api, contextHolder] = notification.useNotification();
    notification.config({
        getContainer: () => alertRef.current as HTMLElement,
    });

    useEffect(() => {
        appDispatch(deleteMessage());
        return () => {
            appDispatch(deleteMessage());
        };
    }, []);

    useEffect(() => {
        if (type) {
            api[type]({
                message: title,
                description: content,
                placement: 'top',
                onClose() {
                    appDispatch(deleteMessage());
                },
            });
        }
    }, [type, content]);

    return (
        <StyledAlert type={type} ref={alertRef}>
            {contextHolder}
        </StyledAlert>
    );
};

export default Alert;
