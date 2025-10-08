# Tommy Horne Frontend Deployment

Этот проект содержит фронтенд приложение Tommy Horne с автоматизированным развертыванием на VPS сервере с nginx и SSL сертификатом.

## Структура проекта

```
tommy-horne-front/
├── index.html              # Главная страница приложения
├── nginx.conf              # Конфигурация nginx с HTTPS
├── deploy.py               # Основной Python скрипт развертывания
├── quick_deploy.py         # Упрощенный скрипт для быстрого развертывания
├── deploy.sh               # Bash скрипт развертывания (legacy)
├── setup-ssl.sh            # Скрипт настройки SSL сертификата
├── deploy_config.json      # Конфигурационный файл
├── requirements.txt        # Python зависимости
├── tommy-horne-front.service # Systemd сервис
├── README.md               # Документация
└── [статические файлы]     # CSS, JS, изображения и т.д.
```

## Быстрый старт

### 1. Подготовка сервера

Убедитесь, что у вас есть:
- VPS сервер с Ubuntu/Debian
- Домен, указывающий на IP сервера
- Доступ по SSH с правами root

### 2. Загрузка проекта на сервер

```bash
# Клонируйте или загрузите проект на сервер
git clone <your-repo-url> /tmp/tommy-horne-front
cd /tmp/tommy-horne-front

# Или загрузите файлы через scp
scp -r . root@your-server-ip:/tmp/tommy-horne-front/
```

### 3. Python развертывание (рекомендуется)

#### Быстрое развертывание:
```bash
# Перейдите в директорию проекта
cd /tmp/tommy-horne-front

# Запустите быстрый скрипт
sudo python3 quick_deploy.py --domain synaptrixtools.com --email your-email@example.com
```

#### Полное развертывание с конфигурацией:
```bash
# Отредактируйте конфигурацию (опционально)
nano deploy_config.json

# Запустите основной скрипт
sudo python3 deploy.py --domain synaptrixtools.com --email your-email@example.com
```

#### Интерактивный режим:
```bash
sudo python3 deploy.py
# Скрипт запросит домен и email
```

### 4. Bash развертывание (legacy)

```bash
# Сделайте скрипт исполняемым
chmod +x deploy.sh setup-ssl.sh

# Запустите развертывание
sudo ./deploy.sh --domain synaptrixtools.com --email your-email@example.com
```

## Что делают скрипты развертывания

### Python скрипты (рекомендуется):

#### `deploy.py` - Полный скрипт развертывания:
1. **Обновление системы** - обновляет пакеты системы
2. **Установка зависимостей** - устанавливает nginx, certbot и другие необходимые пакеты
3. **Создание структуры директорий** - создает необходимые папки с правильными правами
4. **Резервное копирование** - создает бэкап существующего развертывания
5. **Развертывание файлов** - копирует файлы фронтенда в web-директорию
6. **Настройка nginx** - конфигурирует nginx с HTTPS
7. **Настройка SSL** - получает SSL сертификат от Let's Encrypt
8. **Настройка файрвола** - открывает необходимые порты
9. **Настройка логирования** - настраивает ротацию логов
10. **Создание сервиса** - создает systemd сервис для автозапуска
11. **Мониторинг** - настраивает базовый мониторинг
12. **Конфигурация** - использует JSON конфигурацию для гибкой настройки

#### `quick_deploy.py` - Упрощенный скрипт:
- Быстрое развертывание без дополнительных настроек
- Минимальная конфигурация
- Идеально для тестирования и простых развертываний

### Bash скрипты (legacy):

#### `deploy.sh` - Bash версия полного развертывания:
- Аналогичная функциональность Python версии
- Использует bash команды
- Менее гибкая конфигурация

## Конфигурация nginx

Nginx настроен с:
- HTTP → HTTPS редиректом
- SSL/TLS с современными настройками безопасности
- Gzip сжатием
- Кэшированием статических файлов
- Безопасными заголовками
- CORS для шрифтов

## SSL сертификат

Используется Let's Encrypt с автоматическим обновлением:
- Сертификат обновляется автоматически через cron
- Поддерживает wildcard домены
- Настроена проверка обновления

## Конфигурация

### `deploy_config.json` - Основной конфигурационный файл:

```json
{
    "domain": "synaptrixtools.com",
    "email": "your-email@example.com",
    "server_ip": "your-server-ip",
    "ssl_enabled": true,
    "firewall_enabled": true,
    "monitoring_enabled": true,
    "backup_enabled": true,
    "rate_limiting": {
        "api_rate": "10r/s",
        "static_rate": "30r/s"
    }
}
```

### Командная строка Python скриптов:

```bash
# Основной скрипт с опциями
python3 deploy.py --help

# Быстрый скрипт
python3 quick_deploy.py --help

# Примеры использования
python3 deploy.py --domain synaptrixtools.com --email admin@example.com
python3 deploy.py --no-ssl --no-firewall
python3 quick_deploy.py --domain synaptrixtools.com --email admin@example.com --no-ssl
```

## Управление сервисом

```bash
# Статус сервиса
sudo systemctl status tommy-horne-front

# Запуск сервиса
sudo systemctl start tommy-horne-front

# Остановка сервиса
sudo systemctl stop tommy-horne-front

# Перезапуск сервиса
sudo systemctl restart tommy-horne-front

# Включение автозапуска
sudo systemctl enable tommy-horne-front

# Отключение автозапуска
sudo systemctl disable tommy-horne-front
```

## Управление nginx

```bash
# Проверка конфигурации
sudo nginx -t

# Перезагрузка конфигурации
sudo systemctl reload nginx

# Перезапуск nginx
sudo systemctl restart nginx

# Статус nginx
sudo systemctl status nginx
```

## Логи

```bash
# Логи nginx
sudo journalctl -u nginx -f

# Логи приложения
sudo journalctl -u tommy-horne-front -f

# Логи доступа nginx
sudo tail -f /var/log/nginx/access.log

# Логи ошибок nginx
sudo tail -f /var/log/nginx/error.log
```

## Мониторинг

Скрипт создает базовый мониторинг:
- Проверка доступности сайта каждые 5 минут
- Автоматический перезапуск nginx при проблемах
- Логирование в `/var/log/tommy-horne-front/`

## Резервное копирование

Автоматические бэкапы сохраняются в `/var/backups/tommy-horne-front/`:
- Создается перед каждым развертыванием
- Формат: `backup-YYYYMMDD-HHMMSS.tar.gz`

## Обновление SSL сертификата

```bash
# Проверка обновления (тестовый режим)
sudo certbot renew --dry-run

# Принудительное обновление
sudo certbot renew

# Проверка статуса сертификатов
sudo certbot certificates
```

## Безопасность

Настроены следующие меры безопасности:
- UFW файрвол с открытыми портами 22, 80, 443
- Современные SSL/TLS настройки
- Безопасные HTTP заголовки
- Ограничение доступа к системным файлам
- Rate limiting для API

## Устранение неполадок

### Проблема: Сайт не открывается
```bash
# Проверьте статус nginx
sudo systemctl status nginx

# Проверьте конфигурацию
sudo nginx -t

# Проверьте логи
sudo journalctl -u nginx -f
```

### Проблема: SSL сертификат не работает
```bash
# Проверьте сертификаты
sudo certbot certificates

# Обновите сертификат
sudo certbot renew

# Проверьте DNS
nslookup your-domain.com
```

### Проблема: 502 Bad Gateway
```bash
# Проверьте, что nginx запущен
sudo systemctl status nginx

# Проверьте права доступа к файлам
sudo chown -R www-data:www-data /var/www/tommy-horne-front
```

## Дополнительные настройки

### Изменение домена
1. Обновите DNS записи
2. Отредактируйте nginx конфигурацию
3. Получите новый SSL сертификат
4. Перезапустите nginx

### Добавление API бэкенда
Отредактируйте `nginx.conf` и настройте upstream для вашего API сервера.

## Поддержка

При возникновении проблем:
1. Проверьте логи
2. Убедитесь, что DNS настроен правильно
3. Проверьте статус всех сервисов
4. Обратитесь к документации nginx и certbot

## Лицензия

[Укажите вашу лицензию]
