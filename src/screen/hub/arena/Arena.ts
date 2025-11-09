import React from 'react';
import { useArena } from './useArena';
import { 
    FloorContainer,
    NavArrow,
    Monster,
    BackButton

} from './Arena.styles'

interface ArenaProps {

}

const Arena: React.FC<ArenaProps> = ({
  
}) => {

    const { choiceBattle } = useArena();

    return (
    <FloorContainer>
    );

};