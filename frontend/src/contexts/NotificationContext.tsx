import React, { useState, useEffect, useContext } from 'react';
import IconButton from "@material-ui/core/IconButton";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Snackbar from "@material-ui/core/Snackbar";
import amber from '@material-ui/core/colors/amber';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircle from '@material-ui/icons/CheckCircle';
import Close from '@material-ui/icons/Close';
import Warning from '@material-ui/icons/Warning';
import Info from '@material-ui/icons/Info';
import { makeStyles } from '@material-ui/core/styles';
import clsx from "clsx";

export type NotificationType = {
    open: boolean;
    message: string;
    variant: 'success' | 'info' | 'error' | 'warning';
    openNotification: (variant: 'success' | 'info' | 'error' | 'warning', message: string) => void;
    closeNotification: () => void;
};

export type NotificationState = {
    open: boolean;
    message: string;
    variant: 'success' | 'info' | 'error' | 'warning';
};

interface CustomSnackbarContentProps {
    className?: string;
    message: string;
    onClose: () => void;
    variant: 'success' | 'info' | 'error' | 'warning'
}

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        minHeight: '100%'
    }
}));

const useStyles1 = makeStyles(({ palette }: any) => ({
    success: {
        backgroundColor: '#1e7d41',
    },
    error: {
        backgroundColor: palette.error.dark,
    },
    info: {
        backgroundColor: '#ffffff',
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
        fill: '#ffffff'
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: 4,
        fill: '#ffffff'
    },
    message: {
        display: 'flex',
        alignItems: 'center',
        color: '#ffffff'
    },
    infoColor: {
        color: '#202020',
        fill: '#202020'
    }
}));

const variantIcon = {
    success: CheckCircle,
    warning: Warning,
    error: ErrorIcon,
    info: Info,
};

export const NotificationContext = React.createContext<NotificationType>({
    open: false,
    message: '',
    variant: 'success',
    openNotification: () => { },
    closeNotification: () => { }
});

function CustomSnackbarContent(props: CustomSnackbarContentProps) {
    const { className, message, onClose, variant, ...other } = props;
    const classes = useStyles1(props);
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            message={
                <span className={clsx(classes.message, variant === 'info' && classes.infoColor)}>
                    <Icon className={clsx(classes.icon, classes.iconVariant, variant === 'info' && classes.infoColor)} />
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    color="inherit"
                    onClick={onClose}
                >
                    <Close className={clsx(classes.icon, variant === 'info' && classes.infoColor)} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}

const Notification: React.FC<{}> = props => {
    const { children } = props;
    const classes = useStyles(props);
    const { open, variant, message, closeNotification } = useContext(NotificationContext);

    return (
        <div className={classes.root}>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                autoHideDuration={4000}
                onClose={closeNotification}
            >
                <CustomSnackbarContent
                    onClose={closeNotification}
                    variant={variant}
                    message={message}
                />
            </Snackbar>
            {children}
        </div>
    );
}

export const NotificationContextProvider: React.FC<{}> = (props) => {
    const [data, setData] = useState<NotificationState>({
        open: false,
        message: '',
        variant: 'success'
    });

    const openNotification = (variant: 'success' | 'info' | 'error' | 'warning', message: string) => {
        setData((currentData) => ({ ...currentData, open: true, variant, message }))
    };

    const closeNotification = () => {
        setData((currentData) => ({ ...currentData, open: false }))
    };

    useEffect(() => {
        setData({
            open: false,
            message: '',
            variant: 'success'
        });
    }, []);

    return (
        <NotificationContext.Provider value={{ ...data, openNotification, closeNotification }}>
            <Notification>
                {props.children}
            </Notification>
        </NotificationContext.Provider>
    );
}