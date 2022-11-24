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
                            placeholder="Quận"
                            options={districtOptions}
                            name="districtId"
                            formik={formik}
                        />
                    </Col>
                    <Col span={7}>
                        <Select
                            placeholder="Danh mục"
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
                            placeholder="Tìm quán ăn theo tên hoặc địa chỉ"
                        />
                    </Col>
                    <Col span={3}>
                        <Button htmlType="submit" loading={isLoading}>
                            Tìm kiếm
                        </Button>
                    </Col>
                </Row>
            </Form>
        </StyledRestaurantFilter>
    );
};

export default RestaurantsFilter;
