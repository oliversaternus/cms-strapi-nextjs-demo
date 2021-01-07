import * as React from "react";
import clsx from "clsx";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
import { LocationSection } from '../../tools/Models';
import { stringify } from 'qs';
import { useMemo } from "react";

interface LocationProps {
    location: LocationSection;
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
        background: theme.palette.sectionStyles.location?.background || theme.palette.backgrounds.main,
        color: theme.palette.sectionStyles.location?.text || theme.palette.text.primary,
        position: 'relative',
        overflow: 'hidden'
    },
    container: {
        width: '100%',
        maxWidth: 1016,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 2
    },
    headline: {
        paddingBottom: 32,
        maxWidth: 380,
        fontSize: 32,
        fontWeight: 500,
        lineHeight: 1.2,
        color: theme.palette.sectionStyles.location?.text || theme.palette.text.primary
    },
    '@media (max-width: 1000px)': {
        root: {
            padding: 32,
            paddingBottom: 48,
            paddingTop: 48
        }
    }
}));

const Location: React.FC<LocationProps> = (props) => {
    const { className, style, location } = props;
    const classes = useStyles();
    const iframeURL = useMemo(() => `https://maps.google.com/maps?${stringify({
        f: 'q',
        source: 's_q',
        hl: 'de',
        ie: 'UTF8',
        output: 'embed',
        z: 14,
        hnear: `${location.street || ''} ${location.house || ''}, ${location.code || ''} ${location.city || ''}`,
        ...(location?.name && { q: location.name })
    })}`, [location]);

    return (
        <div
            style={style}
            className={clsx(classes.root, className)}
            id={location.identifier}
        >
            <div className={clsx(classes.container)}>
                {location.headline && <div className={classes.headline}>{location.headline}</div>}
                <iframe src={iframeURL} width="100%" height="400" frameBorder="0" scrolling="no" marginHeight={0} marginWidth={0} ></iframe>
            </div >
        </div >
    );
};

export default Location;