@echo off
title KKuTu All-in-One Starter
echo KKuTu Server를 시작합니다... (Node.js v18)

:: 환경변수 설정 (한글 경로 문제 해결용)
set NVM_HOME=C:\nvm
set NVM_SYMLINK=C:\nvm4w\nodejs

:: NVM을 통해 Node 18 활성화
call nvm use 18.20.8 >nul

cd Server\lib

echo [1/2] 게임 서버 기동 중 (포트 8080)...
start "KKuTu Game Server" cmd /k node Game/cluster.js 0 1

echo [2/2] 웹 서버 기동 중 (포트 80)...
start "KKuTu Web Server" cmd /k node Web/cluster.js 1

echo.
echo 모든 서버가 기동되었습니다! 
echo 브라우저에서 http://kkutu.dasory.kro.kr (또는 localhost)로 접속하세요.
echo (새로 뜬 터미널 창들을 닫으면 서버가 종료됩니다.)
pause
