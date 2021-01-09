import * as React from "react";
import clsx from "clsx";
import { createStyles, makeStyles, fade } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
import { HeroSection } from '../../tools/Models';
import { parse } from 'marked';
import { useMemo } from "react";
import Button from '../styledComponents/StyledButton';
import Image from '../styledComponents/StyledImage';

interface HeroProps {
    hero: HeroSection;
    style?: React.CSSProperties;
    className?: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        minHeight: '60vh',
        width: '100%',
        padding: 48,
        paddingTop: 128,
        paddingBottom: 128,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: theme.palette.sectionStyles.hero?.text || theme.palette.text.secondary,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'relative',
        overflow: 'hidden'
    },
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        maxWidth: 1016,
        zIndex: 2
    },
    content: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        textShadow: theme.palette.sectionStyles.hero?.textShadow && ('0px 0px 16px ' + theme.palette.sectionStyles.hero?.textShadow),
        '& h1': {
            paddingTop: 6,
            paddingBottom: 6,
            margin: 0,
            fontSize: 56,
            fontWeight: 600,
            lineHeight: 1.1,
            color: theme.palette.sectionStyles.hero?.text || theme.palette.text.secondary
        },
        '& h2': {
            paddingTop: 6,
            paddingBottom: 6,
            margin: 0,
            fontSize: 48,
            fontWeight: 300,
            color: theme.palette.sectionStyles.hero?.text || theme.palette.text.secondary
        },
        '& h3': {
            paddingTop: 6,
            paddingBottom: 6,
            margin: 0,
            fontSize: 40,
            fontWeight: 300,
            color: theme.palette.sectionStyles.hero?.text || theme.palette.text.secondary
        },
        '& h4': {
            paddingTop: 6,
            paddingBottom: 6,
            margin: 0,
            fontSize: 32,
            fontWeight: 300,
            color: theme.palette.sectionStyles.hero?.text || theme.palette.text.secondary
        },
        '& h5': {
            paddingTop: 6,
            paddingBottom: 6,
            margin: 0,
            fontSize: 24,
            fontWeight: 300,
            color: theme.palette.sectionStyles.hero?.text || theme.palette.text.secondary
        },
        '& p': {
            margin: 0,
            marginBottom: 12,
            marginTop: 12,
            fontSize: 16,
            color: theme.palette.sectionStyles.hero?.text || theme.palette.text.secondary
        },
        '& ul': {
            margin: 0,
            marginBottom: 12,
            marginTop: 12,
            fontSize: 16,
            color: theme.palette.sectionStyles.hero?.text || theme.palette.text.secondary,
            paddingLeft: 18
        },
        '& ol': {
            margin: 0,
            marginBottom: 12,
            marginTop: 12,
            fontSize: 16,
            color: theme.palette.sectionStyles.hero?.text || theme.palette.text.secondary,
            paddingLeft: 18
        }
    },
    button: {
        marginTop: 8
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 0,
        top: 0,
        right: 0
    },
    imageOverlay: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 0,
        top: 0,
        right: 0,
        background: theme.palette.sectionStyles.hero?.background
    },
    '@media (max-width: 1000px)': {
        root: {
            padding: 24,
            paddingTop: 96,
            paddingBottom: 96
        }
    }
}));

const Hero: React.FC<HeroProps> = (props) => {
    const { className, style, hero, children } = props;
    const classes = useStyles();
    const parsedContent = useMemo(() => parse(hero.content || ''), [hero]);
    return (
        <div
            style={style}
            className={clsx(classes.root, className)}
            id={hero.identifier}
        >
            <div className={classes.container}>
                <div className={classes.content} dangerouslySetInnerHTML={{ __html: parsedContent }}>

                </div>
                {hero.button && <Button className={classes.button} _color='light' link={hero.button.link} target='_self' >{hero.button.content}</Button>}
                {children}
            </div >
            {hero.image &&
                <>
                    <Image
                        className={classes.imageContainer}
                        src={hero.image.url}
                        previewUrl={hero.image.previewUrl}
                    />
                    <div className={classes.imageOverlay} />
                </>
            }
        </div >
    );
};

export default Hero;