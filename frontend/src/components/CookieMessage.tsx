import React, { useState, useContext } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from './styledComponents/StyledDialog';
import { Button } from '@material-ui/core';
import { CookieContext } from '../contexts/CookieContext';

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
            paddingLeft: 24,
            maxWidth: 420
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

const CookieDialog: React.FC<{}> = () => {
    const classes = useStyles();
    const { acceptCookies, declineCookies } = useContext(CookieContext);
    const [open, setOpen] = useState(true);

    const decline = () => {
        declineCookies();
        setOpen(false);
    };

    const accept = () => {
        acceptCookies();
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
                    <div className={classes.message}>
                        Wir nutzen personalisierte Cookies, um Zugriffe auf diese Website
                        zu analysieren und Dienste von Drittanbietern einzubinden.
                        <br/><br/>
                        Wenn Sie Cookies deaktivieren, werden Sie bestimmte Funktionen der Website,
                        die Cookies erfordern, nicht nutzen können.
                    </div>
                </div>
                <div className={classes.buttonsContainer}>
                    <Button variant="contained" color="secondary" onClick={decline}>Deaktivieren</Button>
                    <Button className={classes.button} variant="contained" color="primary" onClick={accept}>Erlauben</Button>
                </div>
            </div>
        </Dialog>
    );
}

export default CookieDialog;