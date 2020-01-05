const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const jimp = require('jimp');

client.on('ready', () => {
    console.log(`BOT INICIADO COM SUCESSO!\nTOKEN: ${config.token}.`);
});

client.on('message', async message => {
    function modifyImage() {
        const args = message.content.split('/');

        switch (args[1]) {
            case 'poo':
                return memePoo();
            case 'pathetic':
                return memePathetic();
            case 'drake':
                return memeDrake();
            default:
                message.reply(args[1] + ' NÃO EXISTE!')
                break;
        }
        async function memePoo() {
            const img = './src/basePoo.png';
            const image = await jimp.read(img)
            const font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);
            const text1 = args[2], text2 = args[3];
            // TEXTO DE CIMA
            image.print( font, 370, 10, { text: text1, alignmentX: jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: jimp.VERTICAL_ALIGN_MIDDLE }, 400, 250);
            // TEXTO DE BAIXO
            image.print( font, 370, 310, {text: text2, alignmentX: jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: jimp.VERTICAL_ALIGN_MIDDLE }, 400, 250);
            image.write('./memory/' + message.author.username + '.png');

            console.log(message.author.username, message.author.id, '-> adicionou uma nova imagem à pasta "memory"')
            message.reply('sua imagem foi criada com sucesso. Utilize o !view para ver.');
        }

        async function memePathetic() {
            const img = './src/basePatetico.png';
            const image = await jimp.read(img)
            const font = await jimp.loadFont(jimp.FONT_SANS_64_BLACK);
            const text1 = args[2]
            // TEXTO DE CIMA
            image.print( font, 20, 0, { text: text1, alignmentX: jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: jimp.VERTICAL_ALIGN_MIDDLE }, 1000, 230);
            image.write('./memory/' + message.author.username + '.png');

            console.log(message.author.username, message.author.id, '-> adicionou uma nova imagem à pasta "memory"')
            message.reply('sua imagem foi criada com sucesso. Utilize o !view para ver.');
        }

        async function memeDrake() {
            const img = './src/baseDrake.png';
            const image = await jimp.read(img)
            const font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK);
            const text1 = args[2], text2 = args[3];
            // TEXTO DE CIMA
            image.print( font, 260, 0, { text: text1, alignmentX: jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: jimp.VERTICAL_ALIGN_MIDDLE }, 350, 200);
            // TEXTO DE BAIXO
            image.print( font, 260, 230, {text: text2, alignmentX: jimp.HORIZONTAL_ALIGN_CENTER, alignmentY: jimp.VERTICAL_ALIGN_MIDDLE }, 350, 240);
            image.write('./memory/' + message.author.username + '.png');

            console.log(message.author.username, message.author.id, '-> adicionou uma nova imagem à pasta "memory"')
            message.reply('sua imagem foi criada com sucesso. Utilize o !view para ver.');
        }

    }
    function viewImage() {
        message.channel.send({
            files: [{
              attachment: './memory/' + message.author.username + '.png',
              name: message.author.username + '.png'
            }]
        }).then(function(message) {
            message.react('👍');
            message.react('👎');

        });
    }

    if (!message.guild) return;
    if (message.content.startsWith('create')) {
        modifyImage();    
    }
    else if (message.content == '!view') {
        viewImage();
    }
    else if (message.content == '!createlist') {
        return message.channel.send('drake, pathetic, poo');
    }

});

client.login(config.token);