import * as React from "react";
import clsx from "clsx";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
import { TextWithImageSection } from '../../tools/Models';
import { parse } from 'marked';
import { useMemo } from "react";
import Button from '../styledComponents/StyledButton';
import Image from '../styledComponents/StyledImage';

interface TextWithImageProps {
    text: TextWithImageSection;
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
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        zIndex: 2
    },
    left: {
        flexDirection: 'row-reverse'
    },
    right: {
        flexDirection: 'row'
    },
    textContainer: {
        width: '45%',
        padding: 16,
    },
    textContent: {
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
    imageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 320,
        width: '48%',
    },
    image: {
        height: 320,
        width: '100%',
        boxShadow: '12px 12px 12px rgba(64, 81, 102,.4)'
    },
    button: {
        marginTop: 0
    },
    '@media (max-width: 800px)': {
        textContainer: {
            width: '100%',
            paddingTop: 32,
        },
        imageContainer: {
            width: '100%',
            paddingTop: 24,
            padding: 16
        },
        root: {
            padding: 16,
            paddingTop: 48,
            paddingBottom: 48
        }
    }
}));

const TextWithImage: React.FC<TextWithImageProps> = (props) => {
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
                <div className={classes.imageContainer}>
                    {text.image &&
                        <Image
                            className={classes.image}
                            src={text.image.url}
                            previewUrl={text.image.previewUrl}
                        />}
                </div>
                <div className={classes.textContainer}>
                    <div className={classes.textContent} dangerouslySetInnerHTML={{ __html: parsedContent }}>

                    </div>
                    {text.button && <div className={classes.button}><Button link={text.button.link} _color='primary'>{text.button.content}</Button></div>}
                </div>
            </div >
        </div >
    );
};

export default TextWithImage;