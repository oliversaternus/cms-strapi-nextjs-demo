import * as React from "react";
import clsx from "clsx";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
import { HeroSection } from '../../tools/Models';
import { parse } from 'marked';
import { useMemo } from "react";
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
        <section
            style={style}
            className={clsx(classes.root, className, 'section-hero')}
            id={hero.identifier}
        >
            <div className={classes.container}>
                <div dangerouslySetInnerHTML={{ __html: parsedContent }}>

                </div>
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
        </section>
    );
};

export default Hero;