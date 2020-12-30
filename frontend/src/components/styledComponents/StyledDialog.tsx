import React from 'react';
import Close from '@material-ui/icons/Close';
import { Dialog as MaterialUiDialog, IconButton, DialogContent, Slide, Grow, useMediaQuery, Theme, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const TransitionSlide: any = React.forwardRef(function Transition(props: any, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const TransitionGrow: any = React.forwardRef(function Transition(props: any, ref) {
    return <Grow ref={ref} {...props} />;
});

const TransitionFade: any = React.forwardRef(function Transition(props: any, ref) {
    return <Fade ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) => ({
    content: {
        backgroundColor: theme.palette.background.paper,
        padding: 32,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    mobileContent: {
        padding: 32
    },
    header: {
        width: '100%',
        fontSize: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.text.primary,
        minWidth: 180
    },
    closeButton: {
        position: 'absolute',
        right: 8,
        top: 8
    },
    fullScreenCloseButton: {
        top: 18
    },
    closeIcon: {
        width: 24,
        height: 24,
        fill: theme.palette.text.primary
    },
    iconLight: {
        fill: '#ffffff'
    },
    dialogPaper: {
        backgroundColor: 'transparent'
    },
    mobileDialogPaper: {
        backgroundColor: 'transparent'
    },
    lightTouchRipple: {
        backgroundColor: '#ffffff'
    },
    lightCloseButton: {
        "&:hover": {
            backgroundColor: "rgba(255,255,255,0.225)"
        }
    }
}));

interface DialogProps {
    open: boolean;
    onClose: () => void;
    icon?: any;
    title?: string;
    className?: string;
    style?: any;
    light?: boolean;
    transition?: 'slide' | 'grow' | 'fade';
    preventFullScreen?: boolean;
    contentRef?: ((instance: unknown) => void) | React.RefObject<unknown> | null | undefined;
    navigation?: boolean;
}

const Dialog: React.FC<DialogProps> = (props) => {
    const { open, onClose, children, icon, title, className, style, transition, light, preventFullScreen, contentRef, navigation } = props;
    const classes = useStyles(props);
    const isMobile = useMediaQuery('(max-width:800px)');
    const fullScreen = !preventFullScreen && isMobile;
    return (
        <MaterialUiDialog
            open={open}
            onClose={onClose}
            classes={{ paper: isMobile ? classes.mobileDialogPaper : classes.dialogPaper }}
            maxWidth="lg"
            fullScreen={fullScreen}
            TransitionComponent={transition === 'grow' ? TransitionGrow : (transition === 'fade' ? TransitionFade : TransitionSlide)}
        >
            <DialogContent ref={contentRef} className={clsx(classes.content, isMobile && classes.mobileContent, className)} style={style}>
                {(title || icon) &&
                    <div className={classes.header}>
                        {icon && icon}
                        {title}
                    </div>
                }
                {children}
                <IconButton
                    className={clsx(classes.closeButton, navigation && fullScreen && classes.fullScreenCloseButton)}
                    onClick={onClose}
                >
                    <Close className={clsx(classes.closeIcon, light && classes.iconLight)} />
                </IconButton>
            </DialogContent>
        </MaterialUiDialog>);
};

export default Dialog;