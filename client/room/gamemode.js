//var System = importNamespace('System');
import { DisplayValueHeader, Color } from 'pixel_combats/basic';
import { Build, BuildBlocksSet, Teams, Damage, BreackGraph, Ui, Properties, GameMode, Spawns } from 'pixel_combats/room';

// Разрешения
Damage.FriendlyFire = false;
BreackGraph.OnlyPlayerBlocksDmg.Value = GameMode.Parameters.GetBool("OnlyPlayerBlocksDmg");
BreackGraph.WeakBlocks = true;
// Делаем возможность, ломать все блоки
BreackGraph.BreackAll = true;
// Показываем количество, квадов
Ui.GetContext().QuadsCount.Value = true;
// Разрешаем все чистые, блоки
Build.GetContext().BlocksSet.Value = BuildBlocksSet.AllClear;
// Разрешаем все строительные, опции
Build.GetContext().Pipette.Value = true;
Build.GetContext().FloodFill.Value = true;
Build.GetContext().FillQuad.Value = true;
Build.GetContext().RemoveQuad.Value = true;
Build.GetContext().BalkLenChange.Value = true;
Build.GetContext().FlyEnable.Value = true;
Build.GetContext().SetSkyEnable.Value = true;
Build.GetContext().GenMapEnable.Value = true;
Build.GetContext().ChangeCameraPointsEnable.Value = true;
Build.GetContext().QuadChangeEnable.Value = true;
Build.GetContext().BuildModeEnable.Value = true;
Build.GetContext().CollapseChangeEnable.Value = true;
Build.GetContext().RenameMapEnable.Value = true;
Build.GetContext().ChangeMapAuthorsEnable.Value = true;
Build.GetContext().LoadMapEnable.Value = true;
Build.GetContext().ChangeSpawnsEnable.Value = true;
Build.GetContext().BuildRangeEnable.Value = true;

// Запрет нанесения, урона
Damage.GetContext().DamageOut.Value = false;

// Параметры, игры
Properties.GetContext().GameModeName.Value = "GameModes/EDITOR";
// Создаём, команды
red = GameMode.Parameters.GetBool("RedTeam");
blue = GameMode.Parameters.GetBool("BlueTeam");
if (red || !red && !blue) {
	Teams.Add("Red", "Teams/Red", new Color(1, 0, 0, 0));
	Teams.Get("Red").Spawns.SpawnPointsGroups.Add(2);
}
if (blue || !red && !blue) {
	Teams.Add("Blue", "Teams/Blue", new Color(0, 0, 1, 0));
	Teams.Get("Blue").Spawns.SpawnPointsGroups.Add(1);
}

// Разрешаем вход в команды, по запросу
Teams.OnRequestJoinTeam.Add(function(player,team){team.Add(player);});
// Спавн по входу, в команду
Teams.OnPlayerChangeTeam.Add(function(player){ player.Spawns.Spawn()});

// Задаём, подсказку
Ui.getContext().Hint.Value = "Hint/EditKartu";

// Конфигурация, инвентаря
var Inventory = Inventory.GetContext();
Inventory.Main.Value = false;
Inventory.Secondary.Value = false;
Inventory.Melee.Value = true;
Inventory.Explosive.Value = false;
Inventory.Build.Value = true;
Inventory.BuildInfinity.Value = true;

// Моментальный, спавн
Spawns.GetContext().RespawnTime.Value = 0;
