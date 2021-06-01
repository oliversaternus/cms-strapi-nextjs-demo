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
        alignItems: 'flex-start',
        flexDirection: 'row'
    },
    column1: {
        flex: '0 0 100%',
        maxWidth: '100%',
    },
    column2: {
        flex: '0 0 50%',
        maxWidth: 'calc(50% - 12px)',
    },
    column3: {
        flex: '0 0 33.333%',
        maxWidth: 'calc(33.333% - 12px)',
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
        },
        column: {
            flex: '0 0 100%',
            maxWidth: '100%',
        },
    }
}));

const Columns: React.FC<ColumnsProps> = (props) => {
    const { className, style, columns } = props;
    const classes = useStyles();
    const parsedHeading = useMemo(() => parse(columns.heading || ''), [columns]);
    const parsedContent = useMemo(() => columns.columns.map(column => parse(column.content || '')), [columns]);

    const getColumnsClass = (count: number) => {
        switch (count) {
            case 1:
                return classes.column1;
            case 2:
                return classes.column2;
            case 3:
                return classes.column3;
        }
    }

    return (
        <section
            style={style}
            className={clsx(classes.root, className, 'section-columns')}
            id={columns.identifier}
        >
            <div className={clsx(classes.container)}>
                {columns.heading && <div dangerouslySetInnerHTML={{ __html: parsedHeading }} />}
                <div className={classes.columnsContainer}>
                    {columns.columns.map((column, index) =>
                        <div className={getColumnsClass(columns.columns.length)} dangerouslySetInnerHTML={{ __html: parsedContent[index] }}>

                        </div>
                    )}
                </div>
            </div >
        </section>
    );
};

export default Columns;