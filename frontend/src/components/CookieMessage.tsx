import React, { useState, useContext, useMemo } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from './styledComponents/StyledDialog';
import { Button } from '@material-ui/core';
import { CookieContext } from '../contexts/CookieContext';
import { parse } from 'marked';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: '100%'
        },
        container: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        cookieIcon: {
            width: 56,
            marginLeft: 12,
            marginBottom: 16
        },
        message: {
            padding: 16,
            paddingBottom: 32,
            maxWidth: 420,
            '& h1': {
                fontSize: 20,
                fontWeight: 600
            },
            '& h2': {
                fontSize: 20,
                fontWeight: 600
            },
            '& h3': {
                fontSize: 18,
                fontWeight: 600
            },
            '& h4': {
                fontSize: 18,
                fontWeight: 600
            },
            '& h5': {
                fontSize: 14,
                fontWeight: 400
            },
            '& p': {
                margin: 0,
                fontSize: 14,
                fontWeight: 400
            },
            '& ul': {
                margin: 0,
                paddingLeft: 18,
                fontSize: 14,
                fontWeight: 400
            },
            '& ol': {
                margin: 0,
                paddingLeft: 18,
                fontSize: 14,
                fontWeight: 400
            },
        },
        buttonsContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
        },
        button: {
            marginLeft: 16
        },
        select: {

        },
        '@media (max-width: 800px)': {
            cookieIcon: {
                marginTop: 24,
                marginBottom: 8,
                marginLeft: 0,
            },
            container: {
                flexDirection: 'column',
                paddingBottom: 24
            }
        }
    }),
);

const cookieTypes = [{
    type: 'Essential',
    info: 'Essential Cookies to run this Website'
},
{
    type: 'Analytics & Tracking',
    info: 'Third Party Cookies to enable Analytics and Live-Chat'
}];

const CookieDialog: React.FC<{ message?: string, enabled?: boolean }> = ({ message, enabled }) => {
    const classes = useStyles();
    const { acceptCookies } = useContext(CookieContext);
    const [open, setOpen] = useState(true);
    const parsedMessage = useMemo(() => parse(message || ''), [message]);

    const accept = () => {
        acceptCookies('essential');
        setOpen(false);
    };

    const acceptAll = () => {
        acceptCookies('all');
        setOpen(false);
    };

    return (
        <Dialog
            title="Cookies"
            open={open}
            onClose={() => setOpen(false)}
            preventFullScreen
        >
            <div className={classes.root}>
                <div className={classes.container}>
                    <div className={classes.message} dangerouslySetInnerHTML={{ __html: parsedMessage }}>

                    </div>
                    <div className={classes.select}>
                        {
                            // TODO: add multiple select
                        }
                    </div>
                </div>
                <div className={classes.buttonsContainer}>
                    <Button variant="contained" color="secondary" onClick={accept}>Save</Button>
                    <Button className={classes.button} variant="contained" color="primary" onClick={acceptAll}>Accept All</Button>
                </div>
            </div>
        </Dialog>
    );
}

export default CookieDialog;