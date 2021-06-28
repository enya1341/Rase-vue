FROM node:14.16.0-alpine




# 静的コンテンツを配信するシンプルな http サーバをインストールする
# RUN npm install -g @vue/cli



# `package.json` と `package-lock.json` （あれば）を両方コピーする
COPY package*.json ./ package-lock*.json ./



# カレントワーキングディレクトリ(つまり 'app' フォルダ)にプロジェクトのファイルやフォルダをコピーする
COPY . .

# プロジェクトの依存ライブラリをインストールする
RUN npm install
RUN npm install @vue/cli@3.7.0 -g


# 本番向けに圧縮しながらアプリケーションをビルドする
RUN npm run build

EXPOSE 8080
CMD [ "npm", "run" , "serve" ]