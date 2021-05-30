import * as React from "react";
import clsx from "clsx";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
import { ColumnsSection } from '../../tools/Models';
import { parse } from 'marked';
import { useMemo } from "react";

interface ColumnsProps {
    columns: ColumnsSection;
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
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    columnsContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    headline: {
        width: '100%'
    },
    '@media (max-width: 1000px)': {
        root: {
            padding: 32,
            paddingBottom: 48,
            paddingTop: 48
        },
        columnsContainer: {
            flexDirection: 'column'
        }
    }
}));

const Columns: React.FC<ColumnsProps> = (props) => {
    const { className, style, columns } = props;
    const classes = useStyles();
    const parsedContent = useMemo(() => columns.items.map(column => parse(column.content || '')), [columns]);
    return (
        <section
            style={style}
            className={clsx(classes.root, className, 'section-columns')}
            id={columns.identifier}
        >
            <div className={clsx(classes.container)}>
                <div className={classes.headline}>
                    {columns.headline}
                </div>
                <div className={classes.columnsContainer}>
                    {columns.items.map((column, index) =>
                        <div dangerouslySetInnerHTML={{ __html: parsedContent[index] }}>

                        </div>
                    )}
                </div>
            </div >
        </section>
    );
};

export default Columns;