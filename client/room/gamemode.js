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
Teams.Add("Blue", "<b><size=30><color=#004e81>Ｎ</color><color=#0378a3>Г</color><color=#2e81b1≯</color><color=#2b7aaf>尺</color><color=#1a5f8f>σ</color><color=#156ea2>Ｃ</color><color=#126c97>Ⅰ</color></size></b>", new Color(0, 1, 1, 0));
Teams.Add("Red", "<b><size=30><color=#b43b00>S</color><color=#b44400>丅</color><color=#b44d00>尺</color><color=#b45600>σ</color><color=#b45f00>l</color><color=#b46800>Ƭ</color><color=#b47100>Έ</color><color=#b47a00>刀</color><color=#b48300>Ⅰ</color></size></b>", new Color(1, 0.7, 0, 0));
var PlayersTeam = Teams.Get("Blue");
var StroiteliTeam = Teams.Get("Red");
PlayersTeam.Spawns.SpawnPointsGroups.Add(1);
PlayersTeam.Build.BlocksSet.Value = BuildBlocksSet.Blue;
StroiteliTeam.Spawns.SpawnPointsGroups.Add(2);
StroiteliTeam.Build.BlocksSet.Value = BuildBlocksSet.AllClear;

// Входы, в - режим:
Teams.OnRequestJoinTeam.Add(function(Player,Team){Team.Add(Player);});
Teams.OnPlayerChangeTeam.Add(function(Player){ Player.Spawns.Spawn()});

// Настройка:
Ui.GetContext().Hint.Value = `Здравствуйте: ${Player.NickName}$!`;
 Teams.Get("PlayersTeam").Inventory.Main.Value = false;
 Teams.Get("PlayersTeam").Inventory.Secondary.Value = false;
 Teams.Get("PlayersTeam").Inventory.Melee.Value = false;
 Teams.Get("PlayersTeam").Inventory.Explosive.Value = false;
 Teams.Get("PlayersTeam").Inventory.Build.Value = false;
Teams.Get("PlayersTeam").Properties.Get("AdminLeaderBoard").Value = "<b><i><color>Red>✖</a></i></b>";
Teams.Get("PlayersTeam").Properties.Get("Status").Value = "<b><color=Lime>ＮГ̸尺σＣ</a></b>";




// моментальный спавн
Spawns.GetContext().RespawnTime.Value = 0;
