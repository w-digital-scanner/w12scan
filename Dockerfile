FROM alpine:edge
MAINTAINER w8ay@qq.com

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories
RUN set -x \
    && apk update \
    && apk add python3-dev \
    && apk add bash \
    && apk add tzdata \
    && apk add gcc \
    && apk add libc-dev \
    && apk add linux-headers \
    && apk add nginx \
    && cp -r -f /usr/share/zoneinfo/Hongkong /etc/localtime \
    && mkdir -p /opt/w12scan \
    && mkdir -p /run/nginx

COPY . /opt/w12scan

RUN set -x \
    && cp /opt/w12scan/dockerconf/w12scan_nginx.conf /etc/nginx/conf.d/w12scan_nginx.conf \
    && pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple -r /opt/w12scan/requirements.txt \
    && chmod a+x /opt/w12scan/dockerconf/start.sh \
    && apk del gcc \
    && apk del libc-dev \
    && apk del linux-headers \
    && rm -f /var/cache/apk/*

WORKDIR /opt/w12scan
ENTRYPOINT ["/opt/w12scan/dockerconf/start.sh"]

EXPOSE 8000
CMD ["/usr/bin/tail", "-f", "/dev/null"]
