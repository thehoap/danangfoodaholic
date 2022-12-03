import { Rate as AntRate, RateProps } from 'antd';
import { getDecimal } from 'utils/calculate';
import { StyledRate } from './styles';

export interface IRate extends RateProps {
    exactValue: number;
}
const Rate = ({ exactValue, ...props }: IRate) => {
    return (
        <StyledRate exactValue={exactValue}>
            <AntRate {...props} />
        </StyledRate>
    );
};

export default Rate;
