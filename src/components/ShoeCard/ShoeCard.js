import React from 'react';
import styled, { keyframes } from 'styled-components/macro';

import { WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        {variant === 'on-sale' && <SaleFlag>Sale</SaleFlag>}
          {variant === 'new-release' && (
            <NewFlag>Just released!</NewFlag>
          )}
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={{
              '--color':
                variant === 'on-sale' ? 'var(--color-gray-700)' : undefined,
              '--text-decoration':
                variant === 'on-sale' ? 'line-through' : undefined,
            }}
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' ? (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          ) : undefined}
        </Row>
      </Wrapper>
    </Link>
  );
};

const float = keyframes`
    0% {
    transform: rotateY(0deg) rotate(5deg);
  }
  50% {
    transform: rotateY(-30deg) rotate(-2deg);
  }
  100% {
    transform: rotateY(0deg) rotate(5deg);
  }
`;


const Link = styled.a`
  text-decoration: none;
  color: inherit;
  perspective: 250px;
`;

const Wrapper = styled.article`
    position: relative;
`;

const ImageWrapper = styled.div`
  /* Image overflows on hover/:focus, so truncate spillover */
  overflow: hidden;
  border-radius: 16px 16px 4px 4px;
`;

const Image = styled.img`
  width: 100%;
  display: block;
  transform-origin: 50% 90%;
  transition: transform 600ms, filter 1000ms;
  will-change: transform;
  filter: brightness(90%);
  /* backface-visibility: hidden; */

  @media (hover:hover) and (prefers-reduced-motion: no-preference) {

    ${Link}:hover &,
    ${Link}:focus & {
      animation: revert;
      transform: scale(1.1);
      transition: transform 200ms, filter 400ms;
      filter: brightness(100%);
    }
  }
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: var(--color-gray-900);
`;

const Price = styled.span`
  color: var(--color);
  text-decoration: var(--text-decoration);
`;

const ColorInfo = styled.p`
  color: var(--color-gray-700);
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: var(--color-primary);
`;

const Flag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  background: red;
  height: 32px;
  line-height: 32px;
  padding: 0 10px;
  font-size: ${14 / 18}rem;
  font-weight: ${WEIGHTS.bold};
  color: var(--color-white);
  border-radius: 2px;
  will-change: animation;
  


  @media (hover:hover) and (prefers-reduced-motion: no-preference) {
    animation: ${float} 8000ms infinite alternate ease-in-out;
    ${Link}:hover &,
    ${Link}:focus & {
      animation-play-state: paused;
    }
  }
`;

const SaleFlag = styled(Flag)`
  background-color: var(--color-primary);
`;
const NewFlag = styled(Flag)`
  background-color: var(--color-secondary);
`;

export default ShoeCard;
