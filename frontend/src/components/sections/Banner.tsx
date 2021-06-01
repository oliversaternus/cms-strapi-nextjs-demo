import * as React from "react";
import clsx from "clsx";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { BannerSection } from '../../tools/Models';
import { parse } from 'marked';
import { useMemo } from "react";
import Image from '../styledComponents/StyledImage';

interface BannerProps {
    banner: BannerSection;
    style?: React.CSSProperties;
    className?: string;
}

const useStyles = makeStyles((theme) => createStyles({
    root: {
        width: '100%',
        minHeight: '60vh',
        padding: 48,
        paddingTop: 128,
        paddingBottom: 128,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        color: '#ffffff',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'relative',
        overflow: 'hidden'
    },
    button: {
        marginTop: 12
    },
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        maxWidth: 800,
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
        background: theme.palette.sectionStyles.banner?.background || theme.palette.backgrounds.main
    },
    '@media (max-width: 1000px)': {
        root: {
            padding: 24,
            paddingTop: 96,
            paddingBottom: 96
        }
    }
}));

const Banner: React.FC<BannerProps> = (props) => {
    const { className, banner, children } = props;
    const classes = useStyles();
    const parsedContent = useMemo(() => parse(banner.content || ''), [banner]);

    return (
        <section className={clsx(classes.root, className, 'section-banner')} id={banner.identifier}>
            <div className={classes.container}>
                <div dangerouslySetInnerHTML={{ __html: parsedContent }}>

                </div>
                {children}
            </div>
            {banner.image &&
                <Image
                    className={classes.imageContainer}
                    src={banner.image.url}
                    previewUrl={banner.image.previewUrl}
                />
            }
            <div className={classes.imageOverlay} />
        </section>
    );
};

export default Banner;