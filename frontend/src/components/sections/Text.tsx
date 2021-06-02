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
        paddingTop: 48,
        paddingBottom: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden'
    },
    container: {
        width: '100%',
        maxWidth: 1016
    },
    '@media (max-width: 1000px)': {
        root: {
            padding: 32,
            paddingTop: 48,
            paddingBottom: 48,
        }
    }
}));

const Text: React.FC<TextProps> = (props) => {
    const { className, style, text } = props;
    const classes = useStyles();
    const parsedContent = useMemo(() => parse(text.content || ''), [text]);
    return (
        <section
            style={style}
            className={clsx(classes.root, className, 'section-text')}
            id={text.identifier}
        >
            <div className={clsx(classes.container)}>
                <div dangerouslySetInnerHTML={{ __html: parsedContent }}>

                </div>
            </div >
        </section>
    );
};

export default Text;