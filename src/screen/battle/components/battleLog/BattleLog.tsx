import React, { useEffect, useRef } from 'react';
import type { BattleLogEntry } from '../../../../types';
import * as S from './BattleLog.styles';

interface BattleLogProps {
  logs: BattleLogEntry[];
}

const BattleLog: React.FC<BattleLogProps> = ({ logs }) => {
  const logEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll para o final quando novos logs são adicionados
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getLogIcon = (entry: BattleLogEntry): string => {
    switch (entry.type) {
      case 'player-action':
        return '⚔️';
      case 'monster-action':
        return '👾';
      case 'damage':
        return entry.actor === 'player' ? '💥' : '🩸';
      case 'heal':
        return '💚';
      case 'effect':
        return '✨';
      case 'quiz':
        return '❓';
      case 'system':
        return '📢';
      default:
        return '📝';
    }
  };

  return (
    <S.BattleLogContainer>
      <S.LogHeader>
        <S.LogTitle>📜 Historico de Batalha</S.LogTitle>
      </S.LogHeader>
      
      <S.LogContent>
        {logs.length === 0 ? (
          <S.EmptyLog>Nada Encontrado</S.EmptyLog>
        ) : (
          logs.map((log) => (
            <S.LogEntry 
              key={log.id} 
              $actor={log.actor || 'system'} 
              $type={log.type}
            >
              <S.LogIcon>{getLogIcon(log)}</S.LogIcon>
              <S.LogMessage>
                <S.LogActor $actor={log.actor || 'system'}>
                  {log.actor === 'player' ? 'Você' : log.actor === 'monster' ? 'Monstro' : 'Sistema'}
                </S.LogActor>
                {': '}
                {log.message}
                {log.damage !== undefined && (
                  <S.LogValue $type="damage"> (-{log.damage} HP)</S.LogValue>
                )}
                {log.heal !== undefined && (
                  <S.LogValue $type="heal"> (+{log.heal} HP)</S.LogValue>
                )}
                {log.energy !== undefined && (
                  <S.LogValue $type="energy"> ({log.energy} energia)</S.LogValue>
                )}
              </S.LogMessage>
            </S.LogEntry>
          ))
        )}
        <div ref={logEndRef} />
      </S.LogContent>
    </S.BattleLogContainer>
  );
};

export default BattleLog;
