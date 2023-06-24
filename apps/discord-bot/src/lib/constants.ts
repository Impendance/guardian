import { join } from 'path';
import { EmbedBuilder } from 'discord.js';
export const rootDir = join(__dirname, '..', '..');
export const srcDir = join(rootDir, 'src');

export const baseEmbed = new EmbedBuilder().setColor('#5865f2').setTimestamp(new Date());
export const logBaseEmbed = new EmbedBuilder().setColor('#5865f2').setTimestamp(new Date()).setTitle('username');
