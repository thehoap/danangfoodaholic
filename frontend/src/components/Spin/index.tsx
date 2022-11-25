import { Spin as AntSpin, SpinProps } from 'antd';

interface ISpin extends SpinProps {}

const Spin = ({ ...props }: ISpin) => {
    return <AntSpin {...props} size={'large'} />;
};

export default Spin;
