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
            <FormGroup label="Bạn có giới thiệu địa điểm này cho người khác không?">
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
                        <span>Có</span>
                    </label>
                    <Radio id="yes" value={true} />

                    <label
                        htmlFor="no"
                        className={`option ${
                            !formik.values[name] ? 'active' : ''
                        }`}
                    >
                        <Dislike />
                        <span>Không</span>
                    </label>
                    <Radio id="no" value={false} />
                </Radio.Group>
            </FormGroup>
        </StyledRecommend>
    );
};

export default Recommend;
