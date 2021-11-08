import React from 'react';
import styled from 'styled-components';

import { WEIGHTS } from '../../constants';

const NavLink = ({children, ...delegated}) => {
  return <Wrapper {...delegated}>
    <TextCard data-hover={children}>{children}</TextCard>
</Wrapper>
};

const Wrapper = styled.a`
  font-size: 1.125rem;
  color: var(--color-gray-900);
  font-weight: ${WEIGHTS.medium};

  line-height: 2em;
	perspective: 500px;

  &:first-of-type {
    color: var(--color-secondary);
  }
`;


const TextCard = styled.span`
	position: relative;
	display: inline-block;
	padding: 3px 15px 0;
	box-shadow: inset 0 3px var(--color-gray-100);
	transition: background 600ms;
	transform-origin: 50% 0;
	transform-style: preserve-3d;
	-webkit-transform-origin: 0% 50%;
	-moz-transform-origin: 0% 50%;
	transform-origin: 0% 50%;

  &::before {
  position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: var(--color-gray-100);
	color: #2f4351;
	content: attr(data-hover);
  font-size: 1.25rem;
	transform: rotateX(270deg);
	transition: transform 600ms;
	transform-origin: 0 0;
	pointer-events: none;
  text-align: center;
  font-weight: ${WEIGHTS.bold};
  }

  ${Wrapper}:hover & {
    background: #2f4351;
  }

  ${Wrapper}:hover &::before {
	  transform: rotateX(0deg);
  }

`;

export default NavLink;