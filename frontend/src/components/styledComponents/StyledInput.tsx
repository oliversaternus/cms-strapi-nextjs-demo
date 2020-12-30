import * as React from "react";
import clsx from "clsx";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { fade, Input, InputProps, Theme } from "@material-ui/core";

interface StyledIputProps extends InputProps {
    inputClass?: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        overflowX: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: fade(theme.palette.text.primary, 0.3),
        padding: 12,
        paddingTop: 6,
        paddingBottom: 6,
        borderRadius: 4,
        backgroundColor: theme.palette.customBackground.light
    },
    textfield: {
        flex: 1,
        fontFamily: 'Poppins',
        color: theme.palette.text.primary,
        fontSize: 18
    }
}));

const StyledInput: React.FC<StyledIputProps> = (props) => {
    const { className, style, inputClass, ...others } = props;
    const classes = useStyles();

    return (
        <div style={style} className={clsx(classes.root, className)}>
            <Input
                disableUnderline
                className={clsx(classes.textfield, inputClass)}
                {...others}
            />
        </div>
    );
};

export default StyledInput;