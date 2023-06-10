import style from './loader.module.css';
import { LoaderSvg } from './loader.svg';

type TLoaderProperty = {
    size: number;
    inverse?: boolean;
};

export const Loader = ({ size, inverse = false }: TLoaderProperty) => {
    const loaderColor = inverse ? '#fff' : '#3C39EC';

    const wrapperStyleKey = 'wrapper_' + size;
        return (
            <div className={style[wrapperStyleKey]}>
                <LoaderSvg color={loaderColor} size={size} />
            </div>
        );
};