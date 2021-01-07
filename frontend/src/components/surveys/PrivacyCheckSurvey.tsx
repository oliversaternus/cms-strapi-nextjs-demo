import React, { useEffect, useMemo, useState, useCallback, useContext, useRef } from 'react';
import { createStyles, makeStyles, fade } from '@material-ui/core/styles';
import Survey, { SurveyData } from './Survey';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import { useCounter } from '../../hooks/useCounter';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import clsx from 'clsx';
import StyledInput from '../styledComponents/StyledInput';
import { validate } from 'email-validator';
import StyledSelect from "../styledComponents/StyledSelect";
import { Message } from '../../tools/Models';
import { NotificationContext } from '../../contexts/NotificationContext';
import { createMessage } from '../../tools/Service';
import Link from 'next/link';

export type PrivacyCheckResultData = {
    [key: string]: {
        [key: string]: string;
    }
};

const salutations = [{ value: 'Keine Anrede', label: 'Keine Anrede' }, { value: 'Herr', label: 'Herr' }, { value: 'Frau', label: 'Frau' }];

const surveyData: SurveyData = {
    "steps": [
        {
            "title": "Schritt 1",
            "key": "first",
            "questions": [
                {
                    "type": "radioSelect",
                    "key": "usingPersonalData",
                    "title": "Werden in Ihrem Unternehmen personenbezogene Daten erhoben, verarbeitet oder genutzt?",
                    "choices": [
                        "Ja",
                        "Nein"
                    ],
                    "required": true
                },
                {
                    "type": "info",
                    "key": "noNeed",
                    "title": "Sie sind demnach - rechtlich betrachtet - nicht verpflichtet einen Datenschutzbeauftragten zu bestellen.",
                    "visibleIf": {
                        "key": "usingPersonalData",
                        "condition": "equals",
                        "value": "Nein"
                    }
                },
                {
                    "type": "radioSelect",
                    "key": "usingAutomation",
                    "title": "Erfolgt die Erhebung, Verarbeitung oder Nutzung personenbezogener Daten automatisiert?",
                    "choices": [
                        "Ja",
                        "Nein"
                    ],
                    "required": true,
                    "visibleIf": {
                        "key": "usingPersonalData",
                        "condition": "equals",
                        "value": "Ja"
                    }
                },
                {
                    "type": "radioSelect",
                    "key": "over20People",
                    "title": "Sind mit der automatisierten Verarbeitung personenbezogener Daten mehr als 20 Personen befasst?",
                    "choices": [
                        "Ja",
                        "Nein"
                    ],
                    "required": true,
                    "visibleIf": {
                        "key": "usingAutomation",
                        "condition": "equals",
                        "value": "Ja"
                    }
                },
                {
                    "type": "radioSelect",
                    "key": "usingParivacyAgent",
                    "title": "Haben Sie bereits einen Datenschutzbeauftragten bestellt?",
                    "choices": [
                        "Ja",
                        "Nein"
                    ],
                    "required": true,
                    "visibleIf": {
                        "key": "usingAutomation",
                        "condition": "exists"
                    }
                },
                {
                    "type": "radioSelect",
                    "key": "usingDocumentation",
                    "title": "Ist eine aktuelle, vollständige und nachvollziehbare Systemdokumentation vorhanden?",
                    "choices": [
                        "Ja",
                        "Nein"
                    ],
                    "required": true,
                    "visibleIf": {
                        "key": "usingAutomation",
                        "condition": "exists"
                    }
                }
            ]
        },
        {
            "title": "Schritt 2",
            "key": "second",
            "questions": [
                {
                    "type": "radioSelect",
                    "key": "usingProcessDocumentation",
                    "title": "Liegen aktuelle interne und externe Verfahrensübersichten bzw. ein Verzeichnis für Verarbeitungstätigkeiten vor und werden diese bei Veränderungen zeitnah gepflegt?",
                    "choices": [
                        "Ja",
                        "Nein"
                    ],
                    "required": true
                },
                {
                    "type": "radioSelect",
                    "key": "processReported",
                    "title": "Wurden die jeweiligen Verfahren bei der zuständigen Aufsichtsbehörde angemeldet?",
                    "choices": [
                        "Ja",
                        "Nein"
                    ],
                    "required": true
                },
                {
                    "type": "radioSelect",
                    "key": "definedUsaCases",
                    "title": "Ist für jede Bearbeitung personenbezogener Daten festgelegt, zu welchem Zweck sie erfolgt bzw. auf Grund welcher Rechtsgrundlage?",
                    "choices": [
                        "Ja",
                        "Nein"
                    ],
                    "required": true
                },
                {
                    "type": "radioSelect",
                    "key": "employeesBinded",
                    "title": "Sind alle Mitarbeiter/innen, die personenbezogene Daten bearbeiten, auf das Datenschutzgeheimnis verpflichtet?",
                    "choices": [
                        "Ja",
                        "Nein"
                    ],
                    "required": true
                },
                {
                    "type": "radioSelect",
                    "key": "usingContracts",
                    "title": "Werden bei der Verarbeitung personenbezogener Daten durch Dritte entsprechende vertragliche Regelungen zum Datenschutz getroffen?",
                    "choices": [
                        "Ja",
                        "Nein"
                    ],
                    "required": true
                }
            ]
        }
    ]
};

const useResultStyles = makeStyles((theme) =>
    createStyles({
        root: {
            maxWidth: 560,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
        },
        outerBox: {
            margin: 24,
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: fade(theme.palette.secondary.light, 0.24)
        },
        boxError: {
            backgroundColor: red[100]
        },
        boxSuccess: {
            backgroundColor: green[100]
        },
        boxWarning: {
            backgroundColor: amber[100]
        },
        heading: {
            paddingTop: 16,
            fontSize: 16
        },
        size: {
            width: 200,
            height: 200
        },
        circularError: {
            '&.MuiCircularProgress-colorPrimary': {
                color: red[400]
            }
        },
        circularWarning: {
            '&.MuiCircularProgress-colorPrimary': {
                color: amber[600]
            }
        },
        circularSuccess: {
            '&.MuiCircularProgress-colorPrimary': {
                color: green[500]
            }
        },
        circle: {
            strokeLinecap: 'round'
        },
        score: {
            fontSize: 32
        },
        message: {
            fontSize: 14,
            marginTop: 4,
            marginBottom: 4
        },
        formContainer: {
            paddingTop: 16,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start'
        },
        input: {
            width: '100%',
            marginTop: 4,
            marginBottom: 4
        },
        buttonContainer: {
            paddingTop: 8,
            width: '100%',
            flexWrap: 'wrap-reverse',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-end'
        },
        link: {
            color: theme.palette.text.primary,
            '&:hover': {
                color: theme.palette.text.primary
            }
        },
        button: {
            marginLeft: 8,
            marginTop: 8
        },
        fontSize: {
            fontSize: 14
        },
        select: {
            fontSize: 14,
            paddingTop: 4,
            paddingBottom: 5
        },
    }),
);

const PrivacyCheckResult: React.FC<{ data: PrivacyCheckResultData, reset?: () => void, contentRef?: React.RefObject<unknown> | null | undefined }> = ({ data, reset, contentRef }) => {
    const classes = useResultStyles();
    const { openNotification } = useContext(NotificationContext);
    const [requestedDetails, setRequestedDetails] = useState(false);

    const [message, setMessage] = useState<Message>({
        firstName: '',
        lastName: '',
        salutation: 'Keine Anrede',
        email: '',
        content: JSON.stringify(data, null, 4),
        subject: 'Datenschutz Check',
    });

    const score = useMemo(() => {
        let positive = 0;
        let sum = 0;
        for (const step of Object.keys(data)) {
            data[step];
            for (const key of Object.keys(data[step])) {
                if (data[step][key] === 'Ja') {
                    positive += 1;
                }
                sum += 1;
            }
        }
        return Math.round(100 * positive / sum);
    }, [data]);

    const { value, startCount } = useCounter(0, score, 500, 50, 'ease-out');
    const { value: circleValue, startCount: startCircleCount } = useCounter(0, score, 200, 100, 'ease-out');

    const sendMessage = useCallback(async () => {
        if (!validate(message.email)) {
            openNotification('error', 'Angegebene Email ist ungültig.');
            return;
        }
        if (!message.firstName || !message.email || !message.lastName || !message.content) {
            openNotification('error', 'Bitte füllen Sie alle Felder aus.');
            return;
        }
        const response = await createMessage(message);
        if (response.isError) {
            openNotification('error', 'Fehler beim Senden.');
            return;
        }
        setMessage({
            firstName: '',
            lastName: '',
            salutation: 'Keine Anrede',
            email: '',
            content: JSON.stringify(data, null, 4),
            subject: 'Datenschutz Check',
        });
        setRequestedDetails(true);
    }, [message, validate, openNotification]);

    useEffect(() => {
        startCount();
        startCircleCount();
        (contentRef?.current as HTMLDivElement).scrollTop = 0;
    }, [score, contentRef?.current]);

    if (requestedDetails) {
        return (
            <div className={classes.root}>
                <Alert style={{ marginTop: 24 }} severity='success'><AlertTitle>Vielen Dank!</AlertTitle>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</Alert>
                <div className={classes.buttonContainer}>
                    <Button className={classes.button} variant='contained' color='primary' onClick={reset}>Check wiederholen</Button>
                </div>
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <Box position="relative" display="inline-flex" className={clsx(classes.outerBox, score < 50 && classes.boxError, score >= 50 && score < 90 && classes.boxWarning, score >= 90 && classes.boxSuccess)}>
                <CircularProgress
                    variant="determinate"
                    value={circleValue}
                    size={200}
                    thickness={2}
                    classes={{ root: clsx(score < 50 && classes.circularError, score >= 50 && score < 90 && classes.circularWarning, score >= 90 && classes.circularSuccess), circle: classes.circle }} />
                <Box
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography className={classes.score} variant="caption" component="div" color="textSecondary">{`${Math.round(
                        value
                    )}%`}</Typography>
                </Box>
            </Box>
            { score < 90 && <Alert severity={score < 50 ? 'error' : 'warning'} ><AlertTitle>Achtung!</AlertTitle>Ihr Unternehmen verstößt gegen gesetzliche Regelungen des Datenschutzes.</Alert>}
            { score >= 90 && <Alert severity='success' ><AlertTitle>Gut!</AlertTitle>Sie haben die gesetzlichen Regelungen des Datenschutzes im Blick. </Alert>}
            <div className={classes.formContainer}>
                <Typography className={classes.message}>Fordern Sie jetzt Ihr ausführliches Ergebnis an!<br />Sie akzeptieren damit unsere <a className={classes.link} href='https://kizil.oliversaternus.de/datenschutz'>Datenschutzhinweise</a>.</Typography>
                <StyledSelect
                    className={classes.input}
                    selectClass={classes.select}
                    menuItemClass={classes.fontSize}
                    value={message?.salutation}
                    values={salutations}
                    onChange={(e) => setMessage({ ...message, salutation: e.target?.value })}
                />
                <StyledInput
                    placeholder='Vorname'
                    className={classes.input}
                    value={message?.firstName}
                    inputClass={classes.fontSize}
                    onChange={(e) => setMessage({ ...message, firstName: e.target?.value })}
                />
                <StyledInput
                    placeholder='Nachname'
                    className={classes.input}
                    value={message?.lastName}
                    inputClass={classes.fontSize}
                    onChange={(e) => setMessage({ ...message, lastName: e.target?.value })}
                />
                <StyledInput
                    placeholder='Email'
                    className={classes.input}
                    value={message?.email}
                    inputClass={classes.fontSize}
                    onChange={(e) => setMessage({ ...message, email: e.target?.value })}
                />
            </div>
            <div className={classes.buttonContainer}>
                <Button className={classes.button} variant='contained' color='primary' onClick={reset}>Check Wiederholen</Button>
                <Button className={classes.button} variant='contained' color='secondary' onClick={sendMessage}>Anfordern</Button>
            </div>
        </div>
    );
}

const useDialogStyles = makeStyles((theme) =>
    createStyles({
        dialogContent: {
            maxWidth: 640
        }
    }),
);

const PrivacyCheckSurvey: React.FC<{ survey?: SurveyData }> = ({ survey }) => {
    const classes = useDialogStyles();
    const contentRef = useRef<unknown>();

    return (
        <Survey
            path='datenschutz-check'
            title='Datenschutz Check'
            buttonText={{
                next: 'Weiter',
                prev: 'Zurück',
                complete: 'Zum Ergebnis'
            }}
            displayComplete={(data, reset) => <PrivacyCheckResult data={data} reset={reset} contentRef={contentRef} />}
            surveyData={survey || surveyData}
            rootClass={classes.dialogContent}
            contentRef={contentRef}
        />
    );
}

export default PrivacyCheckSurvey;