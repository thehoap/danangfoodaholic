import { Divider, Tooltip } from 'antd';
import { StyledMenu, StyledMenuItem } from './styles';

const Menu = ({ menu }: { menu: IMenu[] }) => {
    return (
        <StyledMenu>
            <h3>Menu</h3>
            <Divider />
            {menu.map((item: IMenu) => (
                <StyledMenuItem key={item._id}>
                    <img src={item.image} alt="" />
                    <div>
                        <Tooltip title={item.name}>
                            <p>{item.name}</p>
                        </Tooltip>
                        <p>{item.currentPrice || item.originalPrice}</p>
                    </div>
                </StyledMenuItem>
            ))}
        </StyledMenu>
    );
};

export default Menu;
