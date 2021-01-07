import * as React from "react";
import clsx from "clsx";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
import { TextSection } from '../../tools/Models';
import { parse } from 'marked';
import { useMemo } from "react";

interface TextProps {
    text: TextSection;
    style?: React.CSSProperties;
    className?: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: '100%',
        padding: 48,
        paddingTop: 96,
        paddingBottom: 96,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: theme.palette.sectionStyles.text?.background || theme.palette.backgrounds.main,
        color: theme.palette.sectionStyles.text?.text || theme.palette.text.primary,
        position: 'relative',
        overflow: 'hidden'
    },
    container: {
        width: '100%',
        maxWidth: 1016,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        zIndex: 2
    },
    left: {
        flexDirection: 'row'
    },
    right: {
        flexDirection: 'row-reverse'
    },
    textContent: {
        width: '60%',
        '& h1': {
            paddingTop: 6,
            paddingBottom: 6,
            margin: 0,
            fontSize: 32,
            fontWeight: 500,
            lineHeight: 1.2,
            color: theme.palette.sectionStyles.text?.text || theme.palette.text.primary
        },
        '& h2': {
            paddingTop: 6,
            paddingBottom: 6,
            margin: 0,
            fontSize: 32,
            fontWeight: 500,
            lineHeight: 1.2,
            color: theme.palette.sectionStyles.text?.text || theme.palette.text.primary
        },
        '& h3': {
            paddingTop: 6,
            paddingBottom: 6,
            margin: 0,
            fontSize: 32,
            fontWeight: 500,
            lineHeight: 1.2,
            color: theme.palette.sectionStyles.text?.text || theme.palette.text.primary
        },
        '& h4': {
            paddingTop: 6,
            paddingBottom: 6,
            margin: 0,
            fontSize: 32,
            fontWeight: 500,
            lineHeight: 1.2,
            color: theme.palette.sectionStyles.text?.text || theme.palette.text.primary
        },
        '& h5': {
            paddingTop: 6,
            paddingBottom: 6,
            margin: 0,
            fontSize: 32,
            fontWeight: 500,
            lineHeight: 1.2,
            color: theme.palette.sectionStyles.text?.text || theme.palette.text.primary
        },
        '& p': {
            margin: 0,
            fontSize: 16,
            fontWeight: 300,
            color: theme.palette.sectionStyles.text?.text || theme.palette.text.primary
        },
        '& ul': {
            margin: 0,
            paddingBottom: 32,
            fontSize: 16,
            fontWeight: 300,
            color: theme.palette.sectionStyles.text?.text || theme.palette.text.primary,
            paddingLeft: 18
        },
        '& ol': {
            margin: 0,
            paddingBottom: 32,
            fontWeight: 300,
            fontSize: 16,
            color: theme.palette.sectionStyles.text?.text || theme.palette.text.primary,
            paddingLeft: 18
        }
    },
    headline: {
        width: '40%',
        maxWidth: 380,
        fontSize: 32,
        fontWeight: 500,
        lineHeight: 1.2,
        color: theme.palette.sectionStyles.text?.text || theme.palette.text.primary
    },
    '@media (max-width: 1000px)': {
        textContent: {
            width: '100%'
        },
        headline: {
            width: '100%',
            paddingBottom: 24
        },
        root: {
            padding: 32,
            paddingBottom: 48,
            paddingTop: 48
        }
    }
}));

const Text: React.FC<TextProps> = (props) => {
    const { className, style, text } = props;
    const classes = useStyles();
    const parsedContent = useMemo(() => parse(text.content || ''), [text]);
    return (
        <div
            style={style}
            className={clsx(classes.root, className)}
            id={text.identifier}
        >
            <div className={clsx(classes.container, text.align === 'right' ? classes.right : classes.left)}>
                <div className={classes.headline}>
                    {text.headline}
                </div>
                <div className={classes.textContent} dangerouslySetInnerHTML={{ __html: parsedContent }}>

                </div>
            </div >
        </div >
    );
};

export default Text;