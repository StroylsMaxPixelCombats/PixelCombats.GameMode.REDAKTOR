import { Build, Damage, BreackGraph, BuildBlocksSet, Ui, Properties, Teams, Inventory, Spawns, LeaderBoard, GameMode } from 'pixel_combats/room';
import { DisplayValueHeader, Color } from 'pixel_combats/basic';

// Разрешения:
if (GameMode.Parameters.GetBool("OnlyPlayerBlocksDmg")) {
 BreackGraph.OnlyPlayerBlocksDmg = true;
}
Damage.GetContext().FriendlyFire = true;
BreackGraph.WeakBlocks = true;
BreackGraph.BreackAll = true;
Ui.GetContext().QuadsCount.Value = true;
Build.GetContext().BlocksSet.Value = BuildBlocksSet.Blue;
Damage.GetContext().DamageOut.Value = true;

// Создаём, команды:
Teams.Add("Blue", "<b><size=30><color=#004e81>Ｎ</color><color=#0378a3>Г</color><color=#2e81b1≯</color><color=#2b7aaf>尺</color><color=#1a5f8f>σ</color><color=#156ea2>Ｃ</color><color=#126c97>Ⅰ</color></size></b>", new Color(0, 1, 0, 0));
Teams.Add("Red", "<b><size=30><color=#b43b00>S</color><color=#b44400>丅</color><color=#b44d00>尺</color><color=#b45600>σ</color><color=#b45f00>l</color><color=#b46800>Ƭ</color><color=#b47100>Έ</color><color=#b47a00>刀</color><color=#b48300>Ⅰ</color></size></b>", new Color(1, 0.7, 0, 0));
// разрешаем вход в команды по запросу
Teams.OnRequestJoinTeam.Add(function(player,team){team.Add(player);});
// спавн по входу в команду
Teams.OnPlayerChangeTeam.Add(function(player){ player.Spawns.Spawn()});

// задаем подсказку
Ui.getContext().Hint.Value = "Hint/BuildBase";

// конфигурация инвентаря
var roomInventory = Inventory.GetContext();
roomInventory.Main.Value = false;
roomInventory.Secondary.Value = false;
roomInventory.Melee.Value = true;
roomInventory.Explosive.Value = false;
roomInventory.Build.Value = true;
roomInventory.BuildInfinity.Value = true;

// моментальный спавн
Spawns.GetContext().RespawnTime.Value = 0;
