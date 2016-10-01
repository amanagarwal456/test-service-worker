'use strict';

var url = "json-data.php?param=" + Math.random();
self.addEventListener('install', function (event) {
    self.skipWaiting();
    console.log('Installed', event);
});
self.addEventListener('activate', function (event) {
    console.log('Activated', event);
});

self.addEventListener('push', function (event) {
    console.log(event);
    if (event.data) {
        var obj = JSON.parse(event.data.text());
        return self.registration.showNotification(obj.title, {
            body: obj.message,
            icon: obj.largeIcon,
            data: {
                url: obj.url
            }
        });

    }
//    event.waitUntil(
//            console.log(event)
//            fetch(url).then(function (response) {
//        if (response.status !== 200) {
//            throw new Error();
//        }
//        return response.json().then(function (data) {
//            if (data.error) {
//                throw new Error();
//            }
//            var title = data.title;
//            var message = data.message;
//            var icon = data.icon;
//            return self.registration.showNotification(title, {
//                body: message,
//                icon: icon,
//                data: {
//                    url: data.url
//                }
//            });
//        });
//    }).catch(function (err) {
//        console.log('Catch!!');
//        console.log('Unable to retrieve data', err);
//    })
//            );
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    event.waitUntil(
            clients.matchAll({
                type: "window"
            })
            .then(function (clientList) {
                for (var i = 0; i < clientList.length; i++) {
                    var client = clientList[i];
                    if (client.url == '/' && 'focus' in client)
                        return client.focus();
                }
                if (clients.openWindow) {
                    return clients.openWindow(event.notification.data.url);
                }
            })
            );
});