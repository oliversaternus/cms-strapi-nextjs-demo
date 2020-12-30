import * as React from "react";
import clsx from "clsx";
import { createStyles, makeStyles, fade } from "@material-ui/core/styles";
import { Button, ButtonProps, Theme } from "@material-ui/core";
import Link from "next/link";
import { TrackingEvent } from '../../tools/Models';
import { ReactGA } from '../../tools/Analytics';
import { useCallback } from "react";

interface StyledIputProps extends ButtonProps {
    _color?: 'primary' | 'secondary' | 'light';
    _variant?: 'rounded' | 'standard';
    link?: string;
    trackingEvent?: TrackingEvent;
    target?: '_self' | '_blank';
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {

    },
    link: {
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none'
        }
    },
    primary: {
        padding: '12px 24px',
        fontSize: 16,
        fontWeight: 500,
        textTransform: 'none',
        transition: 'background-color 0.18s ease-in, box-shadow 0.18s ease-in, color 0.18s ease-in, transform 0.18s ease-in',
        backgroundColor: fade(theme.palette.primary.light, 0.16),
        color: theme.palette.primary.main,
        boxShadow: 'none',
        '&:hover': {
            transform: 'translateY(-4px)',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            boxShadow: `0px 6px 8px ${fade(theme.palette.primary.light, 0.32)}`
        },
        '&:active': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            boxShadow: 'none',
        }
    },
    secondary: {
        padding: '12px 24px',
        fontSize: 16,
        fontWeight: 500,
        textTransform: 'none',
        transition: 'background-color 0.18s ease-in, box-shadow 0.18s ease-in, color 0.18s ease-in, transform 0.18s ease-in',
        backgroundColor: fade(theme.palette.secondary.light, 0.16),
        color: theme.palette.secondary.main,
        boxShadow: 'none',
        '&:hover': {
            transform: 'translateY(-4px)',
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            boxShadow: `0px 6px 8px ${fade(theme.palette.secondary.light, 0.32)}`
        },
        '&:active': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            boxShadow: 'none',
        }
    },
    light: {
        padding: '12px 24px',
        fontSize: 16,
        fontWeight: 500,
        textTransform: 'none',
        transition: 'background-color 0.18s ease-in, box-shadow 0.18s ease-in, transform 0.18s ease-in',
        backgroundColor: '#ffffff',
        color: theme.palette.primary.main,
        boxShadow: 'none',
        '&:hover': {
            transform: 'translateY(-4px)',
            backgroundColor: '#ffffff',
            color: theme.palette.primary.main,
            boxShadow: `0px 6px 12px ${fade(theme.palette.primary.light, 0.7)}`
        },
        '&:active': {
            backgroundColor: '#ffffff',
            color: theme.palette.primary.main,
            boxShadow: 'none',
        }
    },
    rounded: {
        borderRadius: 24
    }
}));

const StyledButton: React.FC<StyledIputProps> = (props) => {
    const { className, style, children, _color, link, trackingEvent, onClick, ...others } = props;
    const classes = useStyles();

    const hasClicked = useCallback((event: React.MouseEvent<any, MouseEvent>) => {
        event.stopPropagation();
        if (trackingEvent) {
            ReactGA.event(trackingEvent);
        }
        onClick?.(event);
    }, [onClick]);

    if (link && (link.startsWith('/'))) {
        return (
            <Link href={link}>
                <a onClick={hasClicked} className={classes.link} target='_self'>
                    <Button className={clsx(classes.root, _color && classes[_color], className)} variant='contained' {...others}>
                        {children}
                    </Button>
                </a>
            </Link>);
    }

    if (link) {
        return (
            <a href={link} className={classes.link} onClick={hasClicked}>
                <Button className={clsx(classes.root, _color && classes[_color], className)} variant='contained' {...others}>
                    {children}
                </Button>
            </a>);
    }

    return (
        <Button className={clsx(classes.root, _color && classes[_color], className)} variant='contained' onClick={hasClicked} {...others}>
            {children}
        </Button>
    );
};

export default StyledButton;