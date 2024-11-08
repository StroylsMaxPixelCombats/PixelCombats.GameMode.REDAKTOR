import { DisplayValueHeader, Color } from 'pixel_combats/basic';
import { Build, BuildBlocksSet, Teams, Damage, BreackGraph, Ui, GameMode, Spawns, Inventory } 'pixel_combats/room';

// Настройки, команд:
Damage.FriendlyFire = true;
BreackGraph.WeakBlocks = true;
BreackGraph.BreackAll = true;
Ui.GetContext().QuadsCount.Value = true;
Build.GetContext().BlocksSet.Value = BuildBlocksSet.AllClear;

// Строительные, свойства:
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

// Мадефикации - режима:
if (GameMode.Parameters.GetBool("Damage")) {
Damage.GetContext().DamageOut.Value = true;
}
if (GameMode.Parameters.GetBool("BlocksOnly")) {
BreackGraph.OnlyPlayerBlocksDmg = false;
}
if (GameMode.Parameters.GetBool("Weapon1")) {
Inventory.Main.Value = false;
Inventory.Secondary.Value = false;
Inventory.Melee.Value = true;
Inventory.Explosive.Value = false;
Inventory.Build.Value = true;
}
if (GameMode.Parameters.GetBool("1000000HP")) {
player.contextedProperties.MaxHp.Value = 1000000;
}
if (GameMode.Parameters.GetBool("DamageOFF")) {
player.Damage.DamageIn.Value = false;
}

// Создаём - команды:
Teams.Add("Blue", "<b><i>|[•]{Синия КОМАНДА}[•]|</i></b>", new Color(0, 0, 1, 0));
Teams.Add("Red", "<b><i>|[•]{Красная КОМАНДА}[•]</i></b>", new Color(1, 0, 0, 0));
var BlueTeam = Teams.Get("Blue");
var RedTeam = Teams.Get("Red");

// Командная, настройка:
Teams.OnRequestJoinTeam.Add(function(player,team){team.Add(player);});
Teams.OnPlayerChangeTeam.Add(function(player){ player.Spawns.Spawn(); });
Spawns.GetContext().RespawnTime.Value = 5;
Ui.GetContext().Hint.Value = "!Редактируйте, КАРТУ!";

// Инвентарь - сартировочный:
var Inventory = Inventory.GetContext();
Inventory.Main.Value = true;
Inventory.MainInfinity.Value = true;
Inventory.Secondary.Value = true;
Inventory.SecondaryInfinity.Value = true;
Inventory.Melee.Value = true;
Inventory.Explosive.Value = true;
Inventory.ExplosiveInfinity.Value = true;
Inventory.Build.Value = true;
Inventory.BuildInfinity.Value = true;

// Настройка, лидербордов:
LeaderBoard.PlayerLeaderBoardValues = [
  new DisplayValueHeader("Kills", "<b><color=Yellow>Убийства</a></b>", "<b><color=Yellow>Убийства</a></b>")
  new DisplayValueHeader("Deaths", "<b><color=Red>Смерти</a></b>", "<b><color=Red>Смерти</a></b>")
  new DisplayValueHeader("Scores", "<b><color=Lime>Монеты</a></b>", "<b><color=Lime>Монеты</a></b>")
];

LeaderBoard.PlayersWeightGetter.Set(function(player) {
  return player.Properties.Get("Scores").Value;
});

Ui.GetContext().TeamProp1.Value = { Team: "Blue", Prop: "Deaths" };
Ui.GetContext().TeamProp2.Value = { Team: "Red", Prop: "Deaths" };

Damage.OnDeath.Add(function(player) {
  ++player.Properties.Deaths.Value;
});

Damage.OnKill.Add(function(player, killed) {
 if (player.id !== killed.id) { 
    ++player.Properties.Kills.Value;
    player.Properties.Scores.Value += 250;
 }
});




