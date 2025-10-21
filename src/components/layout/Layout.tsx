import React from 'react';
import { useFullscreen } from '../../contexts/FullscreenContext';
import * as S from './Layout.styles';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // Pega a referência 'mainRef' do contexto
  const { mainRef } = useFullscreen(); 
  
  return (
    <>
      <S.GlobalLayoutStyles />
      
      <S.LayoutContainer>
        <S.LayoutContentWrapper> 
          <S.LayoutMain ref={mainRef}>
            {children}
          </S.LayoutMain>
        </S.LayoutContentWrapper>
      </S.LayoutContainer>
      
    </>
  );
}