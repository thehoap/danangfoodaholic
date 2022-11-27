import { Radio, RadioChangeEvent } from 'antd';
import { Dislike, Like } from 'assets/icons';
import FormGroup from 'components/FormGroup';
import { StyledRecommend } from './styles';

interface IRecommend {
    formik: any;
    name: string;
}

const Recommend = ({ formik, name }: IRecommend) => {
    return (
        <StyledRecommend>
            <FormGroup label="Do you recommend this stall for others?">
                <Radio.Group
                    name={name}
                    onChange={formik.handleChange}
                    value={formik.values[name]}
                >
                    <label
                        htmlFor="yes"
                        className={`option ${
                            formik.values[name] ? 'active' : ''
                        }`}
                    >
                        <Like />
                        <span>Yes</span>
                    </label>
                    <Radio id="yes" value={true} />

                    <label
                        htmlFor="no"
                        className={`option ${
                            !formik.values[name] ? 'active' : ''
                        }`}
                    >
                        <Dislike />
                        <span>No</span>
                    </label>
                    <Radio id="no" value={false} />
                </Radio.Group>
            </FormGroup>
        </StyledRecommend>
    );
};

export default Recommend;
