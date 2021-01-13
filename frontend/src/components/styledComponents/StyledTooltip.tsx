import { withStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const LightTooltip = withStyles((theme: Theme) => ({
    tooltip: {
        padding: 8,
        backgroundColor: '#ffffff',
        color: 'rgba(40,40,40,1)',
        boxShadow: theme.shadows[6],
        fontSize: 13,
        fontWeight: 400
    },
}))(Tooltip);

export default LightTooltip;