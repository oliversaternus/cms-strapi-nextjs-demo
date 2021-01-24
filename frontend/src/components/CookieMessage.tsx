import React, { useState, useContext, useMemo } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from './styledComponents/StyledDialog';
import { Button } from '@material-ui/core';
import { CookieContext, AcceptCookieType } from '../contexts/CookieContext';
import { parse } from 'marked';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import Tooltip from '../components/styledComponents/StyledTooltip';
import Collapse from '@material-ui/core/Collapse';

export type CookieOptionsConfig = Array<{ value: string, type: string, info: string }>;

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
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            flexDirection: 'column'
        },
        cookieIcon: {
            width: 56,
            marginLeft: 12,
            marginBottom: 16
        },
        message: {
            padding: 16,
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
            paddingTop: 16,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
        },
        button: {
            marginLeft: 16
        },
        select: {
            padding: 16,
            paddingBottom: 16,
            paddingTop: 0,
        },
        formLabel: {
            fontSize: 14
        },
        formLabelRoot: {
            height: 32
        },
        infoIcon: {
            opacity: 0.8,
            height: 20,
            width: 20
        },
        settingsTitle: {
            fontWeight: 600,
            fontSize: 14,
            paddingBottom: 8
        },
        selectContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start'
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

const CookieDialog: React.FC<{ message?: string, configuration?: CookieOptionsConfig, settingsEnabled?: boolean }> = ({ message, configuration, settingsEnabled }) => {
    const classes = useStyles();
    const { acceptCookies } = useContext(CookieContext);
    const [open, setOpen] = useState(true);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const parsedMessage = useMemo(() => parse(message || ''), [message]);
    const [selected, setSelected] = useState<AcceptCookieType>({
        essential: true,
        all: false,
        none: false
    });
    const config = useMemo(() => {
        if (!Array.isArray(configuration)) {
            return [];
        }
        return configuration;
    }, [configuration]);

    const allowSettings = useMemo(() => config && config.length && settingsEnabled, [config, config.length, settingsEnabled]);

    const handleSelectChange = (value: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelected((current) => ({ ...current, [value]: event.target.checked }));
    };

    const accept = () => {
        acceptCookies(selected);
        setOpen(false);
    };

    const acceptAll = () => {
        acceptCookies({
            essential: true,
            all: true,
            none: false
        });
        setOpen(false);
    };

    const openSettings = () => {
        setSettingsOpen(true);
    };

    return (
        <Dialog
            title="Cookies"
            open={open}
            onClose={() => setOpen(false)}
            preventFullScreen
            transition='slide'
        >
            <div className={classes.root}>
                <div className={classes.container}>
                    <div className={classes.message} dangerouslySetInnerHTML={{ __html: parsedMessage }}>

                    </div>
                    {allowSettings &&
                        <Collapse in={settingsOpen}>
                            <div className={classes.select}>
                                <div className={classes.settingsTitle} >Select accepted Cookies</div>
                                <FormControl>
                                    <FormGroup>
                                        {config?.map(cookieType =>
                                            <div key={cookieType.value} className={classes.selectContainer}>
                                                <FormControlLabel
                                                    className={classes.formLabelRoot}
                                                    disabled={cookieType.value === 'essential'}
                                                    classes={{ label: classes.formLabel }}
                                                    labelPlacement='end'
                                                    label={cookieType.type}
                                                    value={cookieType.value}
                                                    control={<Checkbox
                                                        color='secondary'
                                                        checked={selected[cookieType.value]}
                                                        onChange={handleSelectChange(cookieType.value)}
                                                    />}
                                                />
                                                <Tooltip placement='right-start' title={cookieType.info}><InfoIcon className={classes.infoIcon} /></Tooltip>
                                            </div>
                                        )}
                                    </FormGroup>
                                </FormControl>
                            </div>
                        </Collapse>
                    }
                </div>
                {allowSettings ?
                    <div className={classes.buttonsContainer}>
                        {settingsOpen ?
                            <Button variant="contained" color="primary" onClick={accept}>Save</Button> :
                            <Button variant="text" color="primary" onClick={openSettings}>Settings</Button>
                        }
                        <Button className={classes.button} variant="contained" color="secondary" onClick={acceptAll}>
                            {settingsOpen ? 'Accept All' : 'Accept'}
                        </Button>
                    </div> :
                    <div className={classes.buttonsContainer}>
                        <Button className={classes.button} variant="contained" color="secondary" onClick={acceptAll}>OK</Button>
                    </div>
                }
            </div>
        </Dialog>
    );
}

export default CookieDialog;