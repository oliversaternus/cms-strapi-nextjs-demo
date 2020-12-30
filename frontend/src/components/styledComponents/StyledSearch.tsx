import * as React from "react";
import clsx from "clsx";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Input, InputProps, Theme } from "@material-ui/core";
import SearchIcon from "../../icons/SearchIcon";
import { Button } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';

interface StyledSearchProps extends InputProps {
    onAccept?: () => void;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        backgroundColor: theme.palette.customBackground.light,
        borderRadius: 4,
        overflow: 'hidden'
    },
    container: {
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        paddingTop: 6,
        paddingBottom: 6,
    },
    textfield: {
        flex: 1,
        fontFamily: 'Poppins',
        color: theme.palette.text.primary,
        fontSize: 18
    },
    searchIcon: {
        width: 24,
        height: 24,
        fill: theme.palette.text.primary,
        marginRight: 8
    },
    arrowIcon: {
        width: 24,
        height: 24,
        fill: '#ffffff'
    },
    searchButton: {
        borderRadius: 0
    }
}));

const StyledSearch: React.FC<StyledSearchProps> = (props) => {
    const { onAccept, className, style, ...others } = props;
    const classes = useStyles();

    return (
        <div style={style} className={clsx(classes.root, className)}>
            <div className={classes.container}>
                <Input
                    placeholder="Search"
                    startAdornment={<SearchIcon className={classes.searchIcon} />}
                    disableUnderline
                    className={classes.textfield}
                    {...others}
                />
            </div>
            {onAccept &&
                <Button onClick={onAccept} className={classes.searchButton} color="secondary" variant="contained">
                    <ArrowForward className={classes.arrowIcon} />
                </Button>
            }
        </div>
    );
};

export default StyledSearch;