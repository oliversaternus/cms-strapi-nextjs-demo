import * as React from "react";
import clsx from "clsx";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { fade, TextField, MenuItem, TextFieldProps, Theme } from "@material-ui/core";

type StyledSelectProps = TextFieldProps & {
    values?: Array<{ label: string, value: string | number }>;
    selectClass?: string;
    menuItemClass?: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    textfield: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: fade(theme.palette.componentStyles.input?.text || theme.palette.text.primary, 0.3),
        padding: 12,
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 4,
        backgroundColor: theme.palette.componentStyles.input?.background || theme.palette.backgrounds.main
    },
    input: {
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.componentStyles.input?.background || theme.palette.backgrounds.main,
        fontSize: 18,
        '&:hover': {
            backgroundColor: theme.palette.componentStyles.input?.background || theme.palette.backgrounds.main
        },
        '&.MuiFilledInput-root.Mui-focused': {
            backgroundColor: theme.palette.componentStyles.input?.background || theme.palette.backgrounds.main
        }
    },
    select: {
        paddingTop: 6,
        paddingBottom: 7,
        paddingLeft: 0,
        paddingRight: 0,
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.componentStyles.input?.text || theme.palette.text.primary,
        fontSize: 18,
        backgroundColor: theme.palette.componentStyles.input?.background || theme.palette.backgrounds.main,
        '&:focus': {
            backgroundColor: theme.palette.componentStyles.input?.background || theme.palette.backgrounds.main
        },
    },
    label: {
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.componentStyles.input?.text || theme.palette.text.primary,
        fontSize: 14,
        paddingTop: 0
    },
    menuItem: {
        color: theme.palette.componentStyles.input?.text || theme.palette.text.primary,
        fontFamily: theme.typography.fontFamily,
        fontSize: 18
    }
}));

const StyledSelect: React.FC<StyledSelectProps> = (props) => {
    const { className, values, selectClass, menuItemClass, ...others } = props;
    const classes = useStyles();

    return (
        <TextField
            select
            variant='filled'
            className={clsx(classes.textfield, className)}
            InputProps={{
                className: classes.input,
                disableUnderline: true
            }}
            InputLabelProps={{
                className: classes.label
            }}
            SelectProps={{
                classes: { root: clsx(classes.select, selectClass) }
            }}
            {...others}
        >
            {values && values.map((valueItem, index) =>
                <MenuItem key={valueItem.label + index} value={valueItem.value} className={clsx(classes.menuItem, menuItemClass)}>
                    {valueItem.label}
                </MenuItem>)}
        </TextField>
    );
};

export default StyledSelect;