import { Select as AntSelect, SelectProps } from 'antd';
import FormGroup from 'components/FormGroup';

interface ISelect extends SelectProps {
    label?: string;
    options?: IOption[];
    name: string;
    formik: any;
    allowClear?: boolean;
}

const Select = ({
    label,
    options,
    name,
    formik,
    allowClear = true,
    ...props
}: ISelect) => {
    const handleChange = (value: string | number) => {
        formik.setFieldValue(name, value);
    };

    return (
        <FormGroup label={label}>
            <AntSelect
                {...props}
                value={formik.values[name]}
                onChange={handleChange}
                allowClear={allowClear}
            >
                {options?.map((option: IOption) => (
                    <AntSelect.Option key={option.id} value={option.value}>
                        {option.label}
                    </AntSelect.Option>
                ))}
            </AntSelect>
        </FormGroup>
    );
};

export default Select;
