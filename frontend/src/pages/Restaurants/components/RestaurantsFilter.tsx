import { Col, Form, Row } from 'antd';
import Button from 'components/Button';
import Input from 'components/Input';
import Select from 'components/Select';
import { districts, restaurantTypes } from 'constants/data';
import { useFormik } from 'formik';
import { StyledRestaurantFilter } from './styles';

interface IRestaurantsFilterProps {
    filter: IRestaurantFilter;
    setFilter: SetStateType<IRestaurantFilter>;
    isLoading: boolean;
}

const RestaurantsFilter = ({
    filter,
    setFilter,
    isLoading,
}: IRestaurantsFilterProps) => {
    const districtOptions: IOption[] = districts.map(({ id, label }) => ({
        id,
        label,
        value: id,
    }));

    const restaurantTypeOptions: IOption[] = restaurantTypes.map((type) => ({
        id: type,
        label: type,
        value: type,
    }));

    const formik = useFormik({
        initialValues: filter,
        onSubmit: (values) => {
            setFilter(values);
        },
    });
    return (
        <StyledRestaurantFilter>
            <Form onFinish={formik.handleSubmit}>
                <Row gutter={24}>
                    <Col span={7}>
                        <Select
                            placeholder="Districts"
                            options={districtOptions}
                            name="districtId"
                            formik={formik}
                        />
                    </Col>
                    <Col span={7}>
                        <Select
                            placeholder="Categories"
                            options={restaurantTypeOptions}
                            name="type"
                            formik={formik}
                        />
                    </Col>
                    <Col span={7}>
                        <Input
                            name="searchTerm"
                            formik={formik}
                            value={formik.values.searchTerm}
                            onChange={formik.handleChange}
                            placeholder="Find your food stalls by their name or address"
                        />
                    </Col>
                    <Col span={3}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={isLoading}
                        >
                            Apply
                        </Button>
                    </Col>
                </Row>
            </Form>
        </StyledRestaurantFilter>
    );
};

export default RestaurantsFilter;
