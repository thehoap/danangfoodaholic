import { Rate, RateProps } from 'antd';
import FormGroup from 'components/FormGroup';
import { StyledRating } from './styles';

interface IRating extends RateProps {
    label: string;
    formik: any;
    name: string;
}

const Rating = ({ label, formik, name, ...props }: IRating) => {
    const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

    return (
        <StyledRating>
            <FormGroup label={label}>
                <Rate
                    tooltips={desc}
                    onChange={(value) => formik.setFieldValue(name, value)}
                    value={formik.values[name]}
                />
            </FormGroup>
        </StyledRating>
    );
};

export default Rating;
