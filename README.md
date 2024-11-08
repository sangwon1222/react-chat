## 설치 및 실행

### 서버와 클라이언트 설치

1. **서버 설치 및 실행**

   ```bash
   cd server
   pnpm install
   pnpm start
   ```

2. **클라이언트 설치 및 실행**
   ```bash
   cd client
   pnpm install
   pnpm dev
   ```

### 로컬 테스트

- **다중 브라우저 테스트**: 브라우저 창을 2개 이상 열고 각각 `http://localhost:5173`에 접속하여 메시지 전송 시 다른 창에서도 메시지가 수신되는지 확인합니다.
- **로컬 네트워크 테스트**: 서버를 실행 중인 컴퓨터의 로컬 IP 주소 (`http://<LOCAL_IP>:3000`)를 사용하여 같은 Wi-Fi 환경에 있는 다른 장치에서 접속 가능합니다.
