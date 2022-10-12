// const n=document.getElementById("00")
// n.onclick=function()
// {
//     console.log("00")
// }
var a=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],b=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],win=2048,flag=0,choice=false,fl=false,lose=false;
function r(min,max)
{
    return Math.floor((Math.random()*(max-min+1))+min);
}
window.addEventListener("keyup",function(event)
{
    fl=true;
    var c=b;
    if(event.code=="ArrowUp"||event.code=="KeyW"||event.code=="Numpad8")
    {
        up();
        if(c!=b)
        document.getElementById("label").innerText="Moved up";
    }
    else if(event.code=="ArrowLeft"||event.code=="KeyA"||event.code=="Numpad4")
    {
        left();
        if(c!=b)
        document.getElementById("label").innerText="Moved left";
    }
    else if(event.code=="ArrowDown"||event.code=="KeyS"||event.code=="Numpad2")
    {
        down();
        if(c!=b)
        document.getElementById("label").innerText="Moved down";
    }
    else if(event.code=="ArrowRight"||event.code=="KeyD"||event.code=="Numpad6")
    {
        right();
        if(c!=b)
        document.getElementById("label").innerText="Moved right";
    }
    if(event.code=="KeyU")
    if(a==b)
    document.getElementById("label").innerText="No more undo available";
    else
    {
        document.getElementById("label").innerText="Undo done";
        if(flag==1)
        win/=2;
        a=copyboard(b);
        choice=false;
    }
    if(c!=b && !fl)
    generate();
    display();
    flag=0;
    if(checkwin() && win==Math.pow(2,16) && flag==0)
    document.getElementById("label").innerText="Congratulations for fully completing the game! "+win+" is the last tile you can reach in this game. Hope you had great enjoyment while playing my game :D";
    else if(checkwin() && flag==0)
    {
        document.getElementById("label").innerText="Congratulations for reaching tile "+win+"! You can continue playing to reach even higher tiles. "+(win*2)+" anyone?";
        win+=win;
        flag=1;
    }
    else if(checklose() && c!=b)
    {
        document.getElementById("label").innerText="Sorry, game is over. You can undo though";
        choice=true;
    }
}
)
function copyboard(a)
{
    var b=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    for(var i=0;i<4;i++)
    for(var j=0;j<4;j++)
    b[i][j]=a[i][j];
    return b;
}
function generate()
{
    var i=0,j=0;
    do
    {
        i=r(0,3);
        j=r(0,3);
    }
    while(a[i][j]!=0);
    if(r(0,4)==4)
    a[i][j]=4;
    else
    a[i][j]=2;
}
function display()
{
    for(var i=0;i<4;i++)
    for(var j=0;j<4;j++)
    {
        if(a[i][j]==0)
        document.getElementById(`${i}${j}`).innerText=``;
        else
        document.getElementById(`${i}${j}`).innerText=`${a[i][j]}`;
        if(a[i][j]==2)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgb(255,255,204)";
        else if(a[i][j]==4)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgb(255,255,153)";
        else if(a[i][j]==8)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgb(255,255,102)";
        else if(a[i][j]==16)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgb(255,255,51)";
        else if(a[i][j]==32)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgb(255,230,0)";
        else if(a[i][j]==64)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgb(255,205,0)";
        else if(a[i][j]==128)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgb(255,162,0)";
        else if(a[i][j]==256)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgb(255,128,0)";
        else if(a[i][j]==512)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgb(255,94,0)";
        else if(a[i][j]==1024)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgb(255,77,0)";
        else if(a[i][j]==2048)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgb(255,43,0)";
        else if(a[i][j]==4096)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgb(204,0,0)";
        else if(a[i][j]==8192)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgb(153,0,0)";
        else if(a[i][j]==8192*2)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgb(135,0,0)";
        else if(a[i][j]==8192*4)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgb(120,0,0)";
        else if(a[i][j]==8192*8)
        document.getElementById(`${i}${j}`).style.backgroundColor="rgb(105,0,0)";
        else
        document.getElementById(`${i}${j}`).style.backgroundColor="rgb(255,255,255)";
    }
    console.log("00");
}
function checklose()
{
    lose=true;
    for(var i=0;i<4;i++)
    for(var j=0;j<4;j++)
    if(a[i][j]==0)
    lose=false;
    if(lose==false)
    return lose;
    up();
    if(lose==false)
    return lose;
    left();
    if(lose==false)
    return lose;
    down();
    if(lose==false)
    return lose;
    right();
    return lose;
}
function checkwin()
{
    for(var i=0;i<4;i++)
    for(var j=0;j<4;j++)
    if(a[i][j]%win==0 && a[i][j]!=0)
    return true;
    return false;
}
function up()
{
    for(var j=0;j<4;j++)
    {
        for(var i=0;i<3;i++)
        for(var k=i+1;k<4;k++)
        if(a[i][j]==0 && a[k][j]!=0)
        {
            if(lose)
            {
                lose=false;
                return;
            }
            undo();
            a[i--][j]=a[k][j];
            a[k][j]=0;
            break;
        }
        else if(a[i][j]==a[k][j] && a[i][j]!=0)
        {
            if(lose)
            {
                lose=false;
                return;
            }
            undo();
            a[i][j]+=a[i][j];
            a[k][j]=0;
            break;
        }
        else if(a[i][j]!=0 && a[k][j]!=0)
        break;
    }
}
function left()
{
    for(var i=0;i<4;i++)
    {
        for(var j=0;j<3;j++)
        for(var k=j+1;k<4;k++)
        if(a[i][j]==0 && a[i][k]!=0)
        {
            if(lose)
            {
                lose=false;
                return;
            }
            undo();
            a[i][j--]=a[i][k];
            a[i][k]=0;
            break;
        }
        else if(a[i][j]==a[i][k] && a[i][j]!=0)
        {
            if(lose)
            {
                lose=false;
                return;
            }
            undo();
            a[i][j]+=a[i][j];
            a[i][k]=0;
            break;
        }
        else if(a[i][j]!=0 && a[i][k]!=0)
        break;
    }
}
function down()
{
    for(var j=0;j<4;j++)
    {
        for(var i=3;i>0;i--)
        for(var k=i-1;k>=0;k--)
        if(a[i][j]==0 && a[k][j]!=0)
        {
            if(lose)
            {
                lose=false;
                return;
            }
            undo();
            a[i++][j]=a[k][j];
            a[k][j]=0;
            break;
        }
        else if(a[i][j]==a[k][j] && a[i][j]!=0)
        {
            if(lose)
            {
                lose=false;
                return;
            }
            undo();
            a[i][j]+=a[i][j];
            a[k][j]=0;
            break;
        }
        else if(a[i][j]!=0 && a[k][j]!=0)
        break;
    }
}
function right()
{
    for(var i=0;i<4;i++)
    {
        for(var j=3;j>0;j--)
        for(var k=j-1;k>=0;k--)
        if(a[i][j]==0 && a[i][k]!=0)
        {
            if(lose)
            {
                lose=false;
                return;
            }
            undo();
            a[i][j++]=a[i][k];
            a[i][k]=0;
            break;
        }
        else if(a[i][j]==a[i][k] && a[i][j]!=0)
        {
            if(lose)
            {
                lose=false;
                return;
            }
            undo();
            a[i][j]+=a[i][j];
            a[i][k]=0;
            break;
        }
        else if(a[i][j]!=0 && a[i][k]!=0)
        break;
    }
}
function undo()
{
    if(fl)
    b=copyboard(a);
    fl=false;
}
/*function lol()
{
    var c=2;
    for(var i=0;i<4;i++)
    for(var j=0;j<4;j++,c*=2)
    a[i][j]=c;
}*/
function My2048main()
{
    generate();
    generate();
    //lol();
    b=copyboard(a);
    display();
    //console.log("Main");
}