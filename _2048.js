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
    if(event.code=="ArrowLeft")
    up();
    else if(event.code=="ArrowUp")
    left();
    else if(event.code=="ArrowRight")
    down();
    else if(event.code=="ArrowDown")
    right();
    if(event.code=="KeyU")
    if(checkequalboard(a,b))
    document.getElementById("label").innerText="No more undo available";
    else
    {
        document.getElementById("label").innerText="Undo done";
        if(flag==1)
        win/=2;
        a=copyboard(b);
        choice=false;
    }
    if(!checkequalboard(a,b) && !fl)
    generate();
    display();
    flag=0;
    if(checkwin(a,win) && flag==0)
    {
        document.getElementById("label").innerText="Congratulations for reaching tile "+win+"! You can continue playing to reach even higher tiles. "+(win*2)+" anyone?";
        win+=win;
        flag=1;
    }
    else if(checklose())
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
function checkequalboard(a,b)
{
    for(var i=0;i<4;i++)
    for(var j=0;j<4;j++)
    if(b[i][j]!=a[i][j])
    return false;
    return true;
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
    if(a[i][j]==0)
    document.getElementById(`${i}${j}`).innerText=``;
    else
    document.getElementById(`${i}${j}`).innerText=`${a[i][j]}`;
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
function checkwin(a,win)
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
function main()
{
    generate();
    generate();
    b=copyboard(a);
    display();
    //console.log("Main");
}