import { Select as AntSelect, SelectProps } from 'antd';
import FormGroup from 'components/FormGroup';
import { Key } from 'react';

interface IOption {
    id: Key;
    value: Key;
    label: Key;
}

interface ISelect extends SelectProps {
    label: string;
    options: IOption[];
}

const Select = ({ label, options, ...props }: ISelect) => {
    return (
        <FormGroup label={label}>
            <AntSelect {...props}>
                {options.map((option: IOption) => (
                    <AntSelect.Option key={option.id} value={option.value}>
                        {option.label}
                    </AntSelect.Option>
                ))}
            </AntSelect>
        </FormGroup>
    );
};

export default Select;
