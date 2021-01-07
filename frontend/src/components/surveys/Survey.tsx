import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import Dialog from '../styledComponents/StyledDialog';
import Input from '../styledComponents/StyledInput';
import Select from '../styledComponents/StyledSelect';
import { Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@material-ui/core';
import { usePrevious } from '../../hooks/usePrevious';
import Alert from '@material-ui/lab/Alert';
import Fade from '@material-ui/core/Fade';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import clsx from "clsx";

export type VisibleCondition = {
    key?: string;
    value?: string | number;
    condition?: 'equals' | 'notEquals' | 'greaterThan' | 'lessThan' | 'matchRegex' | 'exists';
    and?: VisibleCondition[];
    or?: VisibleCondition[];
};

export type QuestionType = {
    type: 'radioSelect' | 'select' | 'input' | 'error' | 'warning' | 'info' | 'success' | 'html';
    key: string;
    title: string;
    html?: string;
    choices?: Array<string | number>;
    placeholder?: string;
    multiline?: boolean;
    required?: boolean;
    visibleIf?: VisibleCondition;
}

export interface QuestionProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    data: { [key: string]: any };
    onChange: (newValue: any) => void;
    question: QuestionType;
    step: string;
    index: number;
}

export type SurveyData = {
    steps: Array<{
        title: string;
        key: string;
        questions: QuestionType[];
    }>
};

export interface SurveyProps {
    displayComplete?: (data: any, reset: () => void) => React.ReactNode;
    surveyData: SurveyData;
    rootClass?: string;
    title?: string;
    buttonText?: {
        next?: string;
        prev?: string;
        complete?: string;
    };
    path: string;
    contentRef?: ((instance: unknown) => void) | React.RefObject<unknown> | null | undefined;
}

const compareCondition: (config: VisibleCondition, data: { [key: string]: any }) => boolean = (config, data = {}) => {
    const { condition, key, value } = config;
    if (!key || !condition) {
        return true;
    }
    switch (condition) {
        case 'equals':
            return data[String(key)] === value;
        case 'notEquals':
            return data[String(key)] !== value;
        case 'exists':
            return !!data[String(key)];
        case 'greaterThan':
            return data[String(key)] > String(value);
        case 'lessThan':
            return data[String(key)] < String(value);
        case 'matchRegex':
            return data[String(key)]?.match?.(new RegExp(String(value)));
        default:
            return false;
    }
};

const compare = (config: VisibleCondition, data: { [key: string]: any }) => {
    if (config.and) {
        for (const andCondition of config.and) {
            if (andCondition.condition && andCondition.key) {
                if (!compareCondition(andCondition, data)) {
                    return false;
                }
            }
            else if (!compare(andCondition, data)) {
                return false;
            }
        }
    } else if (config.or) {
        for (const orCondition of config.or) {
            if (orCondition.condition && orCondition.key) {
                if (compareCondition(orCondition, data)) {
                    return true;
                }
            } else if (compare(orCondition, data)) {
                return true;
            }
        }
    } else if (config.condition && config.key) {
        return compareCondition(config, data);
    }
    return false;
};

const useQuestionStyles = makeStyles((theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        container: {
            paddingTop: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            color: theme.palette.componentStyles.dialog?.text || theme.palette.text.primary
        },
        collapse: {
            width: '100%'
        },
        hidden: {
            display: 'none'
        },
        title: {
            fontFamily: theme.typography.fontFamily,
            fontSize: 14,
            color: theme.palette.componentStyles.dialog?.text || theme.palette.text.primary
        },
        fontSize: {
            fontSize: 14
        },
        select: {
            fontSize: 14,
            paddingTop: 4,
            paddingBottom: 5
        },
        inputContainer: {
            width: '100%',
            paddingTop: 2,
            paddingBottom: 2
        },
        htmlContainer: {
            width: '100%'
        }
    }),
);

const Question: React.FC<QuestionProps> = ({ data, question, onChange, step, index, ...others }) => {
    const { type, key, title, choices, placeholder, multiline, html } = question;
    const classes = useQuestionStyles();
    const stepData = data?.[step] || {};
    const isVisible = !Number.isNaN(index) && index !== -1;

    const wasVisible = usePrevious(isVisible);

    useEffect(() => {
        if (wasVisible && !isVisible) {
            const newData = { ...data, [step]: { ...stepData } };
            delete newData[step][key];
            onChange(newData);
        }
    }, [isVisible, wasVisible])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newData = { ...data, [step]: { ...stepData, [key]: event.target.value } };
        onChange(newData);
    };

    return (

        <div className={clsx(classes.root, !isVisible && classes.hidden)} {...others}>
            <Fade in={isVisible}>
                <div className={classes.container}>
                    {type === 'radioSelect' &&
                        <>
                            <Typography className={classes.title}>{title}</Typography>
                            <FormControl>
                                <RadioGroup row value={stepData[key] || 'undefined'} onChange={handleChange}>
                                    {choices?.map(value => <FormControlLabel classes={{ label: classes.fontSize }} key={value} labelPlacement='end' label={value} value={value} control={<Radio color='secondary' size='small' />} />)}
                                </RadioGroup>
                            </FormControl>
                        </>

                    }
                    {(type === 'info' || type === 'error' || type === 'success' || type === 'warning') &&
                        <Alert severity={type}>
                            {title}
                        </Alert>
                    }
                    {(type === 'html') &&
                        <div className={classes.htmlContainer} dangerouslySetInnerHTML={{ __html: html || title }} />
                    }
                    {(type === 'input') &&
                        <>
                            <Typography className={classes.title}>{title}</Typography>
                            <Input
                                value={stepData[key] || ''}
                                onChange={handleChange}
                                placeholder={placeholder}
                                multiline={multiline} rows={multiline ? 4 : undefined}
                                className={classes.inputContainer}
                                inputClass={classes.fontSize}
                            />
                        </>
                    }
                    {(type === 'select') &&
                        <>
                            <Typography className={classes.title}>{title}</Typography>
                            <Select
                                values={choices?.map(item => ({ label: String(item), value: item })) || []}
                                value={stepData[key] || ''}
                                onChange={handleChange}
                                placeholder={placeholder}
                                className={classes.inputContainer}
                                selectClass={classes.select}
                                menuItemClass={classes.fontSize}
                            />
                        </>
                    }
                </div>
            </Fade>
        </div>
    );
}

const useSurveyStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start'
        },
        stepLabelContent: {
            fontFamily: theme.typography.fontFamily,
            color: theme.palette.componentStyles.dialog?.text || theme.palette.text.primary
        },
        stepIconRoot: {
            color: theme.palette.secondary.light,
            '&.MuiStepIcon-active': {
                color: theme.palette.secondary.main
            },
            '&.MuiStepIcon-completed': {
                color: theme.palette.secondary.main
            }
        },
        buttonContainer: {
            paddingTop: 8,
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            justifyContent: 'flex-end'
        },
        button: {
            marginLeft: 8,
            marginTop: 8
        },
        defaultCompleted: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%'
        },
        defaultCompletedText: {
            padding: 16
        },
        stepper: {
            backgroundColor: theme.palette.componentStyles.dialog?.background || theme.palette.backgrounds.main
        },
        '@media (max-width: 800px)': {
            stepper: {
                padding: 0,
                paddingTop: 32
            }
        }
    }),
);

const Survey: React.FC<SurveyProps> = ({ displayComplete, surveyData, rootClass, title, path, buttonText, contentRef }) => {
    const router = useRouter();
    const classes = useSurveyStyles();
    const [data, setData] = useState<{ [key: string]: any }>({});
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState(false);

    const isOpen = useMemo(() => router.asPath.split('#')?.[1] === path, [router, router.asPath]);

    const onClose = useCallback(() => {
        const baseRoute = router.asPath.split('#')?.[0];
        router.replace(baseRoute);
    }, [router, router.asPath]);

    const handleNextStep = () => setActiveStep(currentActiveStep => currentActiveStep + 1);
    const handlePrevStep = () => setActiveStep(currentActiveStep => currentActiveStep - 1);
    const handleComplete = () => setCompleted(true);

    const reset = () => {
        setData({});
        setActiveStep(0);
        setCompleted(false);
    };

    const visibleQuestions = useMemo(() => {
        return surveyData?.steps.map((step, stepIndex) => step.questions
            .filter(question =>
                !question.visibleIf ||
                compare(question.visibleIf as VisibleCondition, data[surveyData?.steps?.[stepIndex].key]))
            .map(question => ({
                key: question.key,
                required: question.required
            })))
    }, [data, surveyData]);

    const canContinueStep = useMemo(() => {
        for (const visibleQuestion of visibleQuestions?.[activeStep]) {
            if (visibleQuestion.required && !data[surveyData?.steps?.[activeStep]?.key]?.[visibleQuestion.key]) {
                return false;
            }
        }
        return true;
    }, [visibleQuestions, activeStep, data, surveyData]);

    const canComplete = useMemo(() => {
        return (activeStep + 1) >= surveyData.steps.length
    }, [activeStep, surveyData]);

    return (
        <Dialog
            title={title || 'Survey'}
            open={isOpen}
            onClose={onClose}
            contentRef={contentRef}
        >
            <div className={clsx(classes.root, rootClass)}>
                {completed ?
                    displayComplete?.(data, reset) ||
                    <div className={classes.defaultCompleted}>
                        <Typography className={classes.defaultCompletedText}>Thank you for your time!</Typography>
                        <Button
                            className={classes.button}
                            variant='contained'
                            color='secondary'
                            onClick={reset}>
                            {buttonText?.prev || 'Back'}
                        </Button>
                    </div> :
                    surveyData.steps.length > 1 ?
                        <Stepper activeStep={activeStep} orientation="vertical" className={classes.stepper}>
                            {surveyData.steps.map((step, stepIndex) => (
                                <Step key={step.title}>
                                    <StepLabel StepIconProps={{ classes: { root: classes.stepIconRoot } }} color='secondary'><span className={classes.stepLabelContent}>{step.title}</span></StepLabel>
                                    <StepContent>
                                        {step.questions.map(question =>
                                            <Question
                                                index={visibleQuestions?.[stepIndex]?.findIndex(visibleQuestion => visibleQuestion.key === question.key)}
                                                step={step.key}
                                                key={question.key}
                                                data={data}
                                                onChange={setData}
                                                question={question as unknown as QuestionType}
                                            />
                                        )}
                                        <div className={classes.buttonContainer}>
                                            <Button
                                                disabled={activeStep < 1}
                                                className={classes.button}
                                                variant='contained'
                                                color='secondary'
                                                onClick={handlePrevStep}>
                                                {buttonText?.prev || 'Back'}
                                            </Button>
                                            <Button
                                                disabled={!canContinueStep}
                                                className={classes.button}
                                                variant='contained'
                                                color='secondary'
                                                onClick={canComplete ? handleComplete : handleNextStep}>
                                                {canComplete ? buttonText?.complete || 'Complete' : buttonText?.next || 'Next'}
                                            </Button>
                                        </div>
                                    </StepContent>
                                </Step>
                            ))}
                        </Stepper> :
                        surveyData.steps[0].questions.map(question =>
                            <Question
                                index={visibleQuestions?.[0]?.findIndex(visibleQuestion => visibleQuestion.key === question.key)}
                                step={surveyData.steps[0].key}
                                key={question.key}
                                data={data}
                                onChange={setData}
                                question={question as unknown as QuestionType}
                            />
                        )
                }

            </div>
        </Dialog>
    );
}

export default Survey;